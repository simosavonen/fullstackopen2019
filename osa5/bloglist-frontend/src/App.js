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
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        )}
      </div>
    )
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
      setBlogs(updatedBlogs) // problematic, kept erasing user.name
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
      blogService.setToken(null) // ehkä turha
    } catch (exception) {
      console.log(exception)
    }
  }

  const showMessage = (text, error) => {
    setMessage(text)
    setIsError(error)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
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