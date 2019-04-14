import React from 'react'
import './Notification.css'

const Notification = ({ message, isError }) => {

  if (message) {
    return (
      <div className={isError ? 'notification error' : 'notification'}>
        {message}
      </div>
    )
  }
  return null
}

export default Notification