import React from 'react'
import { useField } from '../hooks'

const Login = ({ handleLogin }) => {
  const username = useField('text')
  const password = useField('password')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username.value, password.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
          <input {...username.inputProps} />
      </div>
      <div>
        password
          <input {...password.inputProps} />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default Login