import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'


const styles = {
  root: {
    width: '100%',
    margin: 20,
  },
  subheader: {
    backgroundColor: '#ccc'
  }
}

const Blogs = (props) => {
  const { classes } = props
  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (!props.blogs) {
    return null
  }

  return (
    <List component="nav"
      subheader={<ListSubheader component="div"
        className={classes.subheader}>BLOGLIST - Blogs in a list</ListSubheader>}
      className={classes.root}>
      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={props.user}
          handleLike={props.handleLike}
          handleRemove={props.handleRemove}
        />
      )}
    </List>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Blogs))