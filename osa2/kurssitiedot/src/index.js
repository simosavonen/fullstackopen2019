import React from 'react'
import ReactDOM from 'react-dom'

const Header = props =>
  <h1>{props.course}</h1>

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => (
  <div>
      {props.parts.map(part =>  
        <Part 
            key={part.id} 
            part={part} 
        />
      )}
  </div>
)

const Course = props => (
    <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
    </div>
)

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
            name: 'Reactin perusteet',
            exercises: 10,
            id: 1
            },
            {
            name: 'Tiedonvälitys propseilla',
            exercises: 7,
            id: 2
            },
            {
            name: 'Komponenttien tila',
            exercises: 14,
            id: 3
            }
        ]
    }

  return (
    <div>
        <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)