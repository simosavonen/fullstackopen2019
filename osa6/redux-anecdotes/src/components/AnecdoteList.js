import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote.id)
    props.setNotification(`you voted: ${anecdote.content}`)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
  }

  const byVotes = (a1, a2) => a2.votes - a1.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.visibleAnecdotes.sort(byVotes).map(anecdote =>
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

const filteredList = ({ anecdotes, filter }) => {
  if (filter === '') {
    return anecdotes
  }
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: filteredList(state),
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
  clearNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList