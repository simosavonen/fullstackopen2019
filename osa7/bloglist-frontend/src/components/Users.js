import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import userService from '../services/users'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Users = (props) => {

  useEffect(() => {
    userService.getAll().then(users => props.initializeUsers(users))
      .catch(err => console.log(err))
  }, [])

  const rows = () => props.allUsers.map(user =>
    <tr key={user.username}>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {rows()}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
  }
}

export default connect(
  mapStateToProps,
  { initializeUsers }
)(Users)