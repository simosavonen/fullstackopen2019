import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const rows = () => persons.map(person =>
    <Person 
      key={person.name}
      person={person}
    />  
  )

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addNumber}>
        <div>
          nimi: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
     
      <h2>Numerot</h2>
      <table>
        <tbody>
          {rows()}
        </tbody>
      </table>
    </div>
  )

}

export default App