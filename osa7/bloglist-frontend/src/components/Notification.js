import React from 'react'
import { connect } from 'react-redux'
import './Notification.css'


const Notification = ({ notification }) => {

  if (notification.text) {
    return (
      <div className={notification.isError ? 'notification error' : 'notification'}>
        {notification.text}
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification