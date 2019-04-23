import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const Blogs = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (!props.blogs) {
    return null
  }

  return (
    <div>
      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={props.user}
          handleLike={props.handleLike}
          handleRemove={props.handleRemove}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(Blogs)