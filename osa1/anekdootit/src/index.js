import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const TopAnecdote = (props) => {
    const { anecdotes, points } = props
    let max = 0
    let index = 0
    for(let i = 0; i < anecdotes.length; i++) {
        if(points[i] > max) {
            max = points[i]
            index = i
        }
    }
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[index]}</p>
            <p>has {points[index]} votes</p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))

  const handleRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleRandom}>next anecdote</button>        
        <TopAnecdote anecdotes={anecdotes} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)