import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const personsToShow = !nameFilter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  const rows = () => personsToShow.map(person =>
    <Person 
      key={person.name}
      person={person}
    />  
  )

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const names = persons.map(person => person.name)
    if(!names.includes(newName)) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else alert(`${newName} on jo luettelossa`)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
        rajaa näytettäviä 
        <input 
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
      </div>
      <h3>lisää uusi</h3>
      <form onSubmit={addNumber}>
        <div>
          nimi: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          numero:
          <input 
            value={newNumber}
            onChange={handleNumberChange}
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