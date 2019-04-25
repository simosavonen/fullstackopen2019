import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import BlogDetails from './components/BlogDetails'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog, commentBlog } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { Route, Link, withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  logintext: {
    flexGrow: 1,
    marginLeft: 20
  },
  logout: {
    marginLeft: 20
  },
  loginbox: {
    padding: 50,
    width: 300,
    height: 250,
  },
  newBlog: {
    marginLeft: 20
  }
}

const App = (props) => {
  const newBlogRef = React.createRef()
  const { classes } = props

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


  const BlogList = () => (
    props.user === null ? loginForm() : blogList()
  )

  const loginForm = () => (
    <Grid container justify="center">
      <Paper className={classes.loginbox} elevation={2}>
        <Typography variant="h5" component="h3">
          log in to application
        </Typography>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </Paper>
    </Grid>
  )


  const blogList = () => (
    <>
      <Grid container>
        <Blogs
          user={props.user}
          handleLike={handleLike}
          handleRemove={handleRemove}
        />
      </Grid>
      <Grid container className={classes.newBlog}>
        <Notification />
      </Grid>
      <Grid container className={classes.newBlog}>
        <Togglable buttonLabel='new blog' ref={newBlogRef}>
          <NewBlog ref={newBlogRef} />
        </Togglable>
      </Grid>
    </>
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
      blogService.setToken(null)
      props.history.push('/')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleComment = async (commentObject) => {
    try {
      const response = await blogService.comment(commentObject)
      props.commentBlog(response)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <Grid container className={classes.root} spacing={16}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to='/'>blogs</Button>
            <Button color="inherit" component={Link} to='/users'>users</Button>
            {props.user &&
              <>
                <Typography variant="h6" color="inherit" className={classes.logintext}>
                  {props.user.name} logged in
                </Typography>
                <Button color="inherit" onClick={handleLogout} className={classes.logout}>logout</Button>
              </>
            }
          </Toolbar>
        </AppBar>
      </Grid>

      <Route exact path='/' render={() => <BlogList />} />
      <Route exact path='/users' render={() => <Users />} />
      <Route path='/users/:id' render={({ match }) =>
        <UserDetails id={match.params.id} />} />
      <Route path='/blogs/:id' render={({ match }) =>
        <BlogDetails
          id={match.params.id}
          handleRemove={handleRemove}
          handleLike={handleLike}
          handleComment={handleComment}
        />} />

    </Grid>

  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    initializeBlogs,
    setNotification,
    likeBlog,
    removeBlog,
    commentBlog,
    setUser
  }
)(withStyles(styles)(App)))