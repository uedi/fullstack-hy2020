import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({location}) => {

    const[ current, setCurrent ] = useState({})

    const key = process.env.REACT_APP_API_KEY
    const query = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`
    
    useEffect(() => {
        axios
            .get(query)
            .then(response => {
                if(response.data && response.data.current) {
                    setCurrent(response.data.current)
                }
            })
    }, [])

    if(!current.temperature) {
        return (
            <div></div>
        )
    }
    
    return (
        <div>
            <h3>Weather in {location}</h3>
            <div>
                <b>temperature:</b> {current.temperature} Celcius
            </div>
            <div>
                <img src={current.weather_icons[0]} style={{height: 100}} alt="current weather" />
            </div>
            <div>
                <b>wind:</b> {current.wind_speed} m/s direction {current.wind_dir}
            </div>
        </div>
    )
}

export default Weather