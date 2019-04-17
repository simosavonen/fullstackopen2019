import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    props.setNotification(`you created: ${event.target.anecdote.value}`)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
    event.target.anecdote.value = ''
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  clearNotification,
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm