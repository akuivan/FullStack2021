import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      if (newNumber === '') {
        window.alert(`${newName} is already added to phonebook`)
      } else {
        let personObject = persons.find(p => p.name === newName)
        updateNumber(personObject, newNumber)
      }

    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Person '${personObject.name}' added`)
        })
    }
  }

  const deletePerson = (name, id) => {
    if (window.confirm(`delete ${name}?`)) {
      personService
        .deleteObject(id)
      setSuccessMessage(`Person '${name}' has been deleted. Refresh page in order to see changes `)

    }
  }

  const updateNumber = (person, number) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      const changedPerson = { ...person, number: number }

      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Number of person '${changedPerson.name}' has been succesfully changed `)
        })
        .catch(error => {
          setErrorMessage(
            `Person '${person.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input
        value={props.filter}
        onChange={props.handleFilterChange}
      />
    </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons.filter(person => person.name.toLowerCase().includes(props.filter)).map(person =>
        <div key={person.id}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => props.deletePerson(person.name, person.id)} >delete</button>
        </div>)}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null || message === '') {
    return null
  } else {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }
}

const ErrorNotification = ({ message }) => {
  if (message === null || message === '') {
    return null
  } else {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}


export default App;