import React from 'react'
import { connect } from 'react-redux'

const UserDetails = (props) => {
  const details = props.allUsers.find(user => user.id === props.id)

  if (!details) {
    return null
  }

  return (
    <div>
      <h2>{details.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {details.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

// sorry en tajunnut sitä ownProps vinkkiä
const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
  }
}

export default connect(mapStateToProps)(UserDetails)