import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const BlogDetails = (props) => {
  const { blogs, user, id, handleRemove,
    handleLike, handleComment } = props
  const blog = blogs.find(b => b.id === id)

  const [comment, setComment] = useState('')

  const confirmRemove = () => {
    const question = `remove blog ${blog.title} by ${blog.author}?`
    if (window.confirm(question)) {
      handleRemove(blog)
      props.history.push('/')
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    if (comment !== '') {
      const commentObject = {
        content: comment,
        blog: blog.id
      }
      handleComment(commentObject)
      setComment('')
    }
  }

  if (!user || !blog) {
    return null
  }

  return (
    <div>
      <h2>blog details</h2>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button><br />
      added by {blog.user.name}<br />
      {blog.user.id === user.id &&
        <button onClick={() => confirmRemove()}>remove</button>
      }
      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <div>
            <input
              type='text'
              value={comment}
              name='Comment'
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(BlogDetails))