const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'LIKE_BLOG':
      const blogToChange = state.find(b => b.id === action.data.id)
      const likedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog => blog.id !== action.data.id ? blog : likedBlog)
    case 'COMMENT_BLOG':
      const commentRecipient = state.find(b => b.id === action.data.blog)
      // get rid of the field 'blog'
      const stripped = {
        content: action.data.content,
        id: action.data.id
      }
      const commentedBlog = {
        ...commentRecipient,
        comments: commentRecipient.comments.concat(stripped)
      }
      return state.map(blog => blog.id !== action.data.blog ? blog : commentedBlog)
    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}

export const createBlog = (data) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_BLOG',
      data,
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    dispatch({
      type: 'LIKE_BLOG',
      data: blog
    })
  }
}

export const commentBlog = (commentObject) => {
  return async dispatch => {
    dispatch({
      type: 'COMMENT_BLOG',
      data: commentObject
    })
  }
}

export default blogReducer
