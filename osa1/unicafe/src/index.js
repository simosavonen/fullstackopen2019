import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Feedback = (props) => {       
    return (
        <div>
            <h1>anna palautetta</h1>
            <Button handleClick={props.handleGood} text="hyvä" />
            <Button handleClick={props.handleNeutral} text="neutraali" />
            <Button handleClick={props.handleBad} text="huono" />
        </div>
    )
}

const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const mean = ( good - bad ) / total 
    const positives = good / total * 100 + " %"

    return (
        <div>
            <h1>statistiikka</h1>
            { total > 0 &&
                <table>
                    <tbody>             
                        <Statistic text="hyvä" value={good} />
                        <Statistic text="neutraali" value={neutral} />
                        <Statistic text="huono" value={bad} />
                        <Statistic text="yhteensä" value={total} />
                        <Statistic text="keskiarvo" value={mean} />
                        <Statistic text="positiivisia" value={positives} />                
                    </tbody>
                </table>
            }
            { total === 0 &&
                <p>Ei yhtään palautetta annettu</p>
            }
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
        <Feedback handleGood={handleGood}
                  handleNeutral={handleNeutral}
                  handleBad={handleBad} />
        <Statistics good={good} 
                    neutral={neutral} 
                    bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)