import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} isError={isError} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...username.inputProps} />
          </div>
          <div>
            password
            <input {...password.inputProps} />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogList = () => {

    // added after seeing example code fron part 5
    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} isError={isError} />
        <p>{user.name} logged in</p>
        <form onSubmit={handleLogout}>
          <button type='submit'>logout</button>
        </form>

        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm handleBlogCreation={handleBlogCreation} />
        </Togglable>

        {blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            user={user}
            handleRemove={handleRemove}
          />
        )}
      </div>
    )
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog)
      // lets assume it got deleted OK
      const blogsMinusOne = blogs.filter(b => b.id !== blog.id)
      setBlogs(blogsMinusOne)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (blog) => {
    // ended up cloning the whole blog object
    const likedBlog = {
      id: blog.id,
      user: {
        id: blog.user.id,
        username: blog.user.username,
        name: blog.user.name
      },
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      await blogService.update(likedBlog)
      const updatedBlogs = blogs.map(b => {
        if (b.id === likedBlog.id) {
          return likedBlog // is likedBlog the best option here?
        } else {
          return b
        }
      })
      setBlogs(updatedBlogs)

      // this kept pushing the content downwards after click, annoying
      // showMessage('your like was registered', false)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleBlogCreation = async (title, author, url) => {

    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const response = await blogService.create(blogObject)
      // bug: response doesn't include user.username or user.name
      // fix: refresh page to get well formed data from backend
      // or we could refactor the backend
      const newBlogs = blogs.concat(response)
      setBlogs(newBlogs)
      showMessage(`a new blog, ${title} by ${author}, was added`, false)
    } catch (exception) {
      showMessage('failed to create a blog, check your form fields', true)
    }

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // took hours to figure this out, the exact form of credentials to pass
      const credentials = {
        username: username.value,
        password: password.value
      }
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      showMessage('wrong username or password', true)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogsUser')
      setUser(null)
      blogService.setToken(null) // is this needed?
    } catch (exception) {
      console.log(exception)
    }
  }

  const showMessage = (text, error) => {
    setMessage(text)
    setIsError(error)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App