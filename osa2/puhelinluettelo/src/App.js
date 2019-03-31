import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ isError, setIsError ] = useState(false)

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
          setMessage(`Lisättiin ${response.data.name}.`)
          setIsError(false)
          setTimeout(() => { setMessage(null) }, 5000)
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
          .catch(error => {
            setMessage(`${newName} oli jo poistettu palvelimelta.`)
            setIsError(true)
            setTimeout(() => { setMessage(null) }, 5000)

            // ehkä pitäisi hakea palvelimelta uusi päivitetty tilanne
            // setPersons(persons.filter(p => p.id !== id))
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
          setMessage(`Poistettiin ${person.name}.`)
          setIsError(false)
          setTimeout(() => { setMessage(null) }, 5000)
        })
        .catch(error => {
          setMessage(`${person.name} oli jo poistettu palvelimelta.`)
          setIsError(true)
          setTimeout(() => { setMessage(null) }, 5000)

          // ehkä pitäisi hakea palvelimelta uusi päivitetty tilanne
          // setPersons(personDeleted)
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
      
      <Notification message={message} isError={isError} />

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