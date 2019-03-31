import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = !nameFilter
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const personSingle = persons.filter(p => p.name === newName) 
    if(personSingle.length === 0) {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      const message = `${newName} on jo luettelossa, korvataanko vanha numero uudella?`
      if(window.confirm(message)) {
        const id = personSingle[0].id
        personService
          .update(id, personObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== id ? p : response.data))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const handleDeletion = person => {    
    if(window.confirm(`Poistetaanko ${person.name}?`)) {
      const personDeleted = persons.filter(p => p.id !== person.id)
      personService
        .remove(person.id)
        .then(() => {
          setPersons(personDeleted)
        })
        .catch(error => {
          console.log('fail', error)
        })
    }
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
      <Persons persons={personsToShow} deleteHandler={handleDeletion} />
    </div>
  )

}

export default App