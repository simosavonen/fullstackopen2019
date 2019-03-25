import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <>
            <p>
                {props.p1} {props.ex1}
            </p>
            <p>
                {props.p2} {props.ex3}
            </p>
            <p>
                {props.p3} {props.ex3}
            </p>
        </>
    )
}

const Total = (props) => {
    const total = props.ex1 + props.ex2 + props.ex3;
    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} ex1={exercises1} 
               p2={part2} ex2={exercises2}
               p3={part3} ex3={exercises3} />
      <Total ex1={exercises1}
             ex2={exercises2}
             ex3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))