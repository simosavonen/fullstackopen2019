import React from 'react'
import './Notification.css'

const Notification = ({ message, isError }) => {
  const redOrGreen = isError ? 'notification error' : 'notification'
  if (message) {
    return (
      <div className={redOrGreen}>
        {message}
      </div>
    )
  }
  return null
}

export default Notification