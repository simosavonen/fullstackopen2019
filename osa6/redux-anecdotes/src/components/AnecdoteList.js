import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props.store.getState()

  const vote = (anecdote) => {
    props.store.dispatch(voteAnecdote(anecdote.id))
    props.store.dispatch(
      setNotification(`you voted: ${anecdote.content}`)
    )
    setTimeout(() => {
      props.store.dispatch(clearNotification())
    }, 5000)
  }

  const filteredList = () => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  }

  const byVotes = (a1, a2) => a2.votes - a1.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredList().sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default AnecdoteList