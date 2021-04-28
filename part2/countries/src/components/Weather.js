import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country, capital }) => {
    const [weather, setWeather] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY

    // fetch weather
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then((response) => {
                setWeather(response.data)
            })
    }, [capital, api_key])

    if (weather === null) {
        return null
    } else {
        const data = weather.current
        console.log(weather)
        return (
            <>
                <h3>Weather in {capital}</h3>
                <br />
                <p>
                    <b>Temperature</b>: {data.temperature} Celsius
                </p>
                <br />
                <img src={data.weather_icons[0]} alt="weather icon" />
                <p>
                    <b>Wind:</b> {data.wind_speed} kp/h direction {data.wind_dir}{' '}
                </p>
            </>
        )
    }
}

export default Weather
