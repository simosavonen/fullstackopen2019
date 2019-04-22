import React from 'react'
import PropTypes from 'prop-types'
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

Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool.isRequired
}

export default Notification