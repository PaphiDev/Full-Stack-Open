import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    return (
        <>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>

            <h2>Languages</h2>
            <ul>
                {country.languages.map((lang) => (
                    <li key={lang.name}>{lang.name}</li>
                ))}
            </ul>
            <br />
            <img src={country.flag} alt="country flag" width="300" height="200" />
            <br />
            <Weather country={country.name} capital={country.capital} />
        </>
    )
}

export default Country
