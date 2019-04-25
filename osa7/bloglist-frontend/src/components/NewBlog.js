import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = {
  paper: {
    padding: 10,
    width: 300,
    marginBottom: 10
  }
}

const NewBlog = React.forwardRef((props, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { classes } = props

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    try {
      const newBlog = await blogService.create(blogObject)
      props.createBlog(newBlog)

      props.setNotification(`a new blog, ${title} by ${author}, was added`)

      setTitle('')
      setAuthor('')
      setUrl('')

      ref.current.toggleVisibility()

    } catch (exception) {
      props.setNotification('failed to create a blog, check your form fields', true)
    }
  }

  return (
    <Paper className={classes.paper} elevation={2}>
      <Typography variant="h5" component="h3">
        create new blog
      </Typography>
      <form onSubmit={addBlog}>
        <TextField
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label='title'
          margin='normal'
          variant='outlined'
        />
        <br />
        <TextField
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          label='author'
          margin='normal'
          variant='outlined'
        />
        <br />
        <TextField
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          label='url'
          margin='normal'
          variant='outlined'
        />
        <br />
        <Button variant="outlined" type='submit'>create</Button>
      </form>
    </Paper>
  )
})

export default connect(
  null,
  { createBlog, setNotification },
  null,
  { forwardRef: true }
)(withStyles(styles)(NewBlog))