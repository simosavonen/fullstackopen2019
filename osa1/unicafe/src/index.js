import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Palautekysely = (props) => {       
    return (
        <div>
            <h1>anna palautetta</h1>
            <button onClick={props.handleGood}>hyvä</button>
            <button onClick={props.handleNeutral}>neutraali</button>
            <button onClick={props.handleBad}>huono</button>
        </div>
    )
}

const Statistiikka = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const mean = ( good - bad ) / total 
    const positives = good / total * 100
    
    return (
        <div>
            <h1>statistiikka</h1>
            <p>hyvä {good}</p>
            <p>neutraali {neutral}</p>
            <p>huono {bad}</p>
            <p>yhteensä {total}</p>
            <p>keskiarvo {mean}</p>
            <p>positiivisia {positives} %</p>
        </div>        
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good +1)
  const handleNeutral = () => setNeutral(neutral +1)
  const handleBad = () => setBad(bad +1)

  return (
    <div>
        <Palautekysely handleGood={handleGood}
                       handleNeutral={handleNeutral}
                       handleBad={handleBad} />
        <Statistiikka good={good} 
                      neutral={neutral} 
                      bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)