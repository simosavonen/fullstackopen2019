import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.p1.name} exercises={props.p1.exercises} />
            <Part part={props.p2.name} exercises={props.p2.exercises} />
            <Part part={props.p3.name} exercises={props.p3.exercises} />
        </div>
    )
}

const Total = (props) => {
    const total = props.p1.exercises + props.p2.exercises + props.p3.exercises;
    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = {
      name: 'Reactin perusteet',
      exercises: 10
    }
    const part2 = {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    }
    const part3 = {
      name: 'Komponenttien tila',
      exercises: 14
    }

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} />
      <Total p1={part1} p2={part2} p3={part3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))