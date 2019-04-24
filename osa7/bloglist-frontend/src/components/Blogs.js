import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';


const styles = {
  root: {
    width: '100%',
    margin: 20,
  },
}

const Blogs = (props) => {
  const { classes } = props
  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (!props.blogs) {
    return null
  }

  return (
    <div className={classes.root}>
      <List component="nav">
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
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Blogs))