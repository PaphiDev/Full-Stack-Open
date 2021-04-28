import React, { useState, useEffect } from 'react'
import CountryInfo from './CountryInfo'

const ShowCountries = ({ countryArray }) => {
    const [displayState, setDisplayState] = useState([])
    let displayCopy = [...displayState]

    // runs whenever countryArray changes
    useEffect(() => {
        setDisplayState(new Array(countryArray.length).fill(false))
    }, [countryArray])

    const buttonClickHandler = (index) => {
        displayCopy[index] = !displayCopy[index]
        setDisplayState(displayCopy)
    }

    const arrayLength = countryArray.length
    if (arrayLength > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    } else if (arrayLength === 1) {
        return (
            <>
                <CountryInfo country={countryArray[0]} />
            </>
        )
    } else if (arrayLength > 0) {
        return (
            <>
                {countryArray.map((country, index) => (
                    <div key={country.alpha3Code}>
                        <p>{country.name}</p>
                        <button onClick={() => buttonClickHandler(index)}>show</button>
                        {displayState[index] && <CountryInfo country={countryArray[index]} />}
                    </div>
                ))}
            </>
        )
    } else {
        return null
    }
}

export default ShowCountries
