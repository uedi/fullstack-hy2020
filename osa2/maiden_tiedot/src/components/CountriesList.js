import React from 'react'

const CountriesListItem = ({country, handleClick}) => (
    <div>
        {country.name}
        <button onClick={handleClick}>show</button>
    </div>
)

//<ShowButton key={i} text="show" handleClick={handleShowCountry} />

const CountriesList = ({countries, allCountries, handleShowCountry}) => {
    if(allCountries) {
        return (
            <></>
        )
    } else if(countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if(countries.length > 1) {
        return (
            <div>
                { countries.map((country,i) =>
                    <CountriesListItem key={i} country={country} handleClick={handleShowCountry(country.name)} />
                )}
            </div>
        )
    } else if(countries.length === 0) {
        return (
            <div>No match</div>
        )
    }
    return (
        <></>
    )
}

export default CountriesList