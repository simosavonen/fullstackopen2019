import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogList = () => {
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

        {blogs.map(blog =>
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
      setBlogs(blogsMinusOne) // no need to sort
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
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))

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
      // bug: response ei sisällä tietoa user.username tai user.name
      // fix: lataa sivu uudestaan, niin backend antaa blogit oikein
      // muotoiltuina... tai sitten refactor backend.
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
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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