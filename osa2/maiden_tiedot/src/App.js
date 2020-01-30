import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountriesList from './components/CountriesList'
import Country from './components/Country'

const App = () => {
    const [ filter, setFilter ] = useState('')
    const [ restcountries, setRestcountries ] = useState([])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleShowCountry = (country) => () => {
        setFilter(country)
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setRestcountries(response.data)
            })

    }, [])

    const countriesToShow = filter === '' ? [] : restcountries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    const allCountries = filter === ''

    return (
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <CountriesList countries={countriesToShow} allCountries={allCountries} handleShowCountry={handleShowCountry}/>
            <Country country={countriesToShow.length === 1 ? countriesToShow[0] : {}}/>
        </div>
    )
}

export default App