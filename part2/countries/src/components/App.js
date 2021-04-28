import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import ShowCountries from './ShowCountries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')

    // fetch countries data
    const hook = () => {
        axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
            setCountries(response.data)
        })
    }
    useEffect(hook, [])

    // countries array after being filtered
    const countriesToShow = countries.filter((country) =>
        country.name.toLowerCase().includes(newFilter.toLowerCase())
    )

    // handlers
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h1>Country Search</h1>
            <Filter text={'Find countries: '} value={newFilter} eventHandler={handleFilterChange} />
            {newFilter !== '' && <ShowCountries countryArray={countriesToShow} />}
        </div>
    )
}

export default App
