import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'


const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  const newBlogRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => props.initializeBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
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


  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogout}>
        <button type='submit'>logout</button>
      </form>

      <Togglable buttonLabel='new blog' ref={newBlogRef}>
        <NewBlog ref={newBlogRef} />
      </Togglable>

      <Blogs
        user={user}
        handleLike={handleLike}
        handleRemove={handleRemove}
      />
    </div>
  )


  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog)
      props.removeBlog(blog)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (blog) => {
    try {
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      await blogService.update(likedBlog)
      props.likeBlog(blog)
    } catch (exception) {
      console.log(exception)
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
      props.setNotification('wrong username or password', true)
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

  return (
    <div>
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default connect(
  null,
  {
    initializeBlogs,
    setNotification,
    likeBlog,
    removeBlog
  }
)(App)