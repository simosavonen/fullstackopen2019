import React, { useState } from 'react'

const blogStyle = {
  padding: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog }) => {
  const [minimized, setMinimized] = useState(true)
  if (minimized) {
    return (
      <div style={blogStyle} onClick={() => setMinimized(!minimized)}>
        {blog.title} {blog.author}
      </div>
    )
  }
  return (
    <div style={blogStyle} onClick={() => setMinimized(!minimized)}>
      {blog.title} {blog.author} <br />
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={(event) => event.stopPropagation()}>like</button><br />
      added by {blog.user.name}
    </div>
  )
}

export default Blog