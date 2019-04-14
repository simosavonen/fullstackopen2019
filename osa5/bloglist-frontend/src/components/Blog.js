import React, { useState } from 'react'

const blogStyle = {
  padding: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, handleLike, user, handleRemove }) => {
  const [minimized, setMinimized] = useState(true)

  const handleClick = (event) => {
    event.stopPropagation() // clicking the button should not minimize the parent div
    handleLike(blog)
  }

  const confirmRemove = (event) => {
    event.stopPropagation()
    const question = `remove blog ${blog.title} by ${blog.author}?`
    if (window.confirm(question)) {
      handleRemove(blog)
    }
  }

  if (minimized) {
    return (
      <div style={blogStyle} onClick={() => setMinimized(!minimized)}>
        {blog.title} {blog.author}
      </div>
    )
  }
  // user.id doesn't exist for some reason?
  // user only contains the token, username and name
  return (
    <div style={blogStyle} onClick={() => setMinimized(!minimized)}>
      {blog.title} {blog.author} <br />
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={(event) => handleClick(event)}>like</button><br />
      added by {blog.user.name}<br />
      {blog.user.username === user.username &&
        <button onClick={(event) => confirmRemove(event)}>remove</button>
      }
    </div>
  )
}

export default Blog