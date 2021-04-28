import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import Persons from './Persons'
import personsService from '../services/persons'
import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [name, setNewName] = useState('')
    const [number, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const resetErrorMessage = () => {
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    // fetch numbers from db.json
    useEffect(() => {
        personsService
            .getAll()
            .then((initialNumbers) => {
                setPersons(initialNumbers)
            })
            .catch((error) => {
                console.log('Failed fetching the data')
            })
    }, [])

    const removePerson = (id, name) => {
        const result = window.confirm(`Delete ${name}?`)

        if (result) {
            personsService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== id))
                    setErrorMessage({ msg: `${name} has been removed`, color: 'green' })
                    resetErrorMessage()
                })
                .catch((error) => {
                    setErrorMessage({
                        msg: `Information of ${name} has already been removed from the database`,
                        color: 'red',
                    })
                    resetErrorMessage()
                })
        }
    }

    // add or update an entry
    const addPerson = (event) => {
        event.preventDefault()

        if (persons.find((person) => person.name === name)) {
            const result = window.confirm(
                `${name} is already added to the phonebook, replace the old number with a new one?`
            )

            if (result) {
                const getObject = persons.find((person) => person.name === name)
                const person = persons.find((n) => n.id === getObject.id)
                const updatedObject = { ...person, number: number }

                personsService
                    .update(getObject.id, updatedObject)
                    .then((response) => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== getObject.id ? person : response
                            )
                        )
                        setErrorMessage({
                            msg: `${name}'s phone number has been updated`,
                            color: 'green',
                        })
                        resetErrorMessage()
                        setNewNumber('')
                        setNewName('')
                    })
                    .catch((error) => {
                        setErrorMessage({
                            msg: `Information of ${name} has already been removed from the database`,
                            color: 'red',
                        })
                        resetErrorMessage()
                    })
            }
        } else {
            const personObject = { name, number }

            personsService
                .create(personObject)
                .then((response) => {
                    setPersons(persons.concat(response))
                    setErrorMessage({ msg: `Added ${name}`, color: 'green' })
                    resetErrorMessage()
                    setNewNumber('')
                    setNewName('')
                })
                .catch((error) => {
                    setErrorMessage({ msg: `Failed adding ${name}`, color: 'red' })
                    resetErrorMessage()
                })
        }
    }

    const personsToShow =
        newFilter === ''
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().includes(newFilter.toLowerCase())
              )

    // handlers
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={errorMessage} />
            <Filter
                text={'filter shown with:'}
                value={newFilter}
                eventHandler={handleFilterChange}
            />

            <h2>Add a new contact</h2>
            <PersonForm
                submitHandler={addPerson}
                name={{ text: 'name', value: name, eventHandler: handleNameChange }}
                number={{ text: 'number', value: number, eventHandler: handleNumberChange }}
                button={'add'}
            />

            <h2>Numbers</h2>
            <Persons person={personsToShow} deleteHandler={removePerson} />
        </div>
    )
}

export default App
