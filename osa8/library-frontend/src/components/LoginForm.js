import React, { useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      const result = await props.login({
        variables: { username, password }
      })

      const token = result.data.login.value

      props.setToken(token)
      localStorage.setItem('library-user-token', token)

      setUsername('')
      setPassword('')
    } catch (error) {
      props.handleError(error)
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Log In</h2>
      <div>
        username
      <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>

  )
}

export default LoginForm