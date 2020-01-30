import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ filter, setFilter] = useState('')
    
    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const getNewPerson = () => {
        return { name: newName, number: newNumber }
    }

    const clearNewPersonData = () => {
        setNewName('')
        setNewNumber('')
    }

    const createNewPerson = () => {
        const personObject = getNewPerson()
        personsService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                clearNewPersonData()
            })
    }

    const updatePerson = (id) => {
        const personObject = getNewPerson()
        personsService
            .update(id, personObject)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                clearNewPersonData()
            })
    }

    const addPerson = (event) => {
        event.preventDefault()
        if(persons.some(person => person.name === newName)) {
            const alreadyAdded = persons.find(person => person.name === newName)
            if(alreadyAdded.number === newNumber) {
                alert(`${newName} with number ${newNumber} is already added to phonebook`)
            } else if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                updatePerson(alreadyAdded.id)
            }
        } else {
            createNewPerson()
        }
    }

    const deletePerson = (id) => {
        const name = persons.find(p => p.id === id).name
        if(window.confirm(`Detele ${name}`)) {
            personsService.remove(id)
            .then(response => {
                setPersons(persons.filter(person => person.id !== id))
            })
        }
        
    }

    const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm 
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deletePerson={deletePerson}/>
        </div>
  )

}

export default App