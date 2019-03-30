import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

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
      <Filter filter={nameFilter} handler={handleNameFilterChange} />
      <h3>lisää uusi</h3>
      <PersonForm 
        formAction={addNumber}
        nameState={newName}
        numberState={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
      />     
      <h3>Numerot</h3>
      <Persons persons={personsToShow} />
    </div>
  )

}

export default App