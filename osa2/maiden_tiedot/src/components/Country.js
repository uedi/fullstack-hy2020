import React from 'react'
import Weather from './Weather'

const Language = ({name}) => (
    <li>{name}</li>
)

const CountryWithInfo = ({country}) => {
   
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map((language, i) =>
                    <Language key={i} name={language.name} />
                )}
            </ul>
            <img src={country.flag} style={{height: 100}} alt="flag" />
            <Weather location={country.capital} />
        </div>
    )

}

const Country = ({country}) => {
    if(!country.name) {
        return (
        <></>
        )
    }
    return (
        <CountryWithInfo country={country} />   
    )
}

export default Country