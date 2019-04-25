import React from 'react'
import { useField } from '../hooks'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Login = ({ handleLogin }) => {
  const username = useField('text')
  const password = useField('password')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username.value, password.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        {...username.inputProps}
        label="username"
        margin="normal"
        variant="outlined"
      />
      <TextField
        {...password.inputProps}
        label="Password"
        margin="normal"
        variant="outlined"
      />
      <br />
      <Button variant="contained" type="submit">
        login
      </Button>
    </form>
  )
}

export default Login