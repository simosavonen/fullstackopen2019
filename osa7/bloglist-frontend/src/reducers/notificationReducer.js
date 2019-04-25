const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {
      text: action.text,
      isError: action.isError
    }
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const setNotification = (text, isError = false, timeout = 5000) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      text,
      isError
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout)
  }
}


export default notificationReducer