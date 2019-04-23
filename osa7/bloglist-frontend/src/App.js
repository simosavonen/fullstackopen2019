import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'


const App = (props) => {
  const newBlogRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => props.initializeBlogs(blogs))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm handleLogin={handleLogin} />
    </div>
  )


  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Togglable buttonLabel='new blog' ref={newBlogRef}>
        <NewBlog ref={newBlogRef} />
      </Togglable>

      <Blogs
        user={props.user}
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

  const handleLogin = async (username, password) => {
    try {
      const credentials = {
        username,
        password
      }
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      props.setUser(user)
    } catch (exception) {
      props.setNotification('wrong username or password', true)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogsUser')
      props.setUser(null)
      blogService.setToken(null) // is this needed?
    } catch (exception) {
      console.log(exception)
    }
  }

  const navLink = { padding: 5 }
  const logoutForm = {
    display: 'inline-block',
    marginLeft: 10
  }

  const BlogList = () => (
    props.user === null ? loginForm() : blogList()
  )

  return (
    <Router>
      <div>
        <div>
          <Link style={navLink} to='/'>blogs</Link>
          <Link style={navLink} to='/users'>users</Link>
          {props.user &&
            <form style={logoutForm} onSubmit={handleLogout}>
              {props.user.name} logged in <button type='submit'>logout</button>
            </form>
          }
        </div>
        <Route exact path='/' render={() => <BlogList />} />
        <Route path='/users' render={() => <Users />} />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  {
    initializeBlogs,
    setNotification,
    likeBlog,
    removeBlog,
    setUser
  }
)(App)