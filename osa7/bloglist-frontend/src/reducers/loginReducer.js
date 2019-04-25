const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      user,
    })
  }
}

export default loginReducer