import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  blog: {
    backgroundColor: '#ddd',
    '&:hover': {
      backgroundColor: '#fff',
    }
  },
}

const Blog = ({ blog, classes }) => {
  return (
    <ListItem className={classes.blog} component={Link} to={`/blogs/${blog.id}`}>
      <ListItemText primary={`${blog.title} ${blog.author}`} />
    </ListItem>
  )
}

export default withStyles(styles)(Blog)