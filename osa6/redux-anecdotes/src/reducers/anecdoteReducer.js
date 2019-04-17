const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const voteTarget = state.find(a => a.id === id)
      const voteRecipient = {
        ...voteTarget,
        votes: voteTarget.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : voteRecipient)
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export default anecdoteReducer