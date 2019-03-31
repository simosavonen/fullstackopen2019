import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'
import CountryDetails from './components/CountryDetails'
import Country from './components/Country'

const MatchingCountries = (props) => {
    const { countries, nameFilter, handleShow, setCapital, weatherData } = props
    const matches = countries.filter(c => c.name.toLowerCase().startsWith(nameFilter))
    //console.log('matching countries: ', matches)

    const rows = () => matches.map(country =>
        <Country 
            key={country.name} 
            country={country} 
            showButtonHandler={handleShow} 
        />   
    )

    if(matches.length === 1) {
        setCapital(matches[0].capital)
        return (
            <>            
            <CountryDetails country={matches[0]} />
            <Weather weatherData={weatherData} /> 
            </>   
        )
    }
    if(matches.length < 10) {
        return (
            <table>
                <tbody>
                    {rows()}
                </tbody>                
            </table>           
        )
    }
    return (
        <div>Too many matches, speficy another filter</div>
    )    
}

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ nameFilter, setNameFilter ] = useState('')
    const[ weatherData, setWeatherData ] = useState(null)
    const[ capital, setCapital ] = useState('Helsinki') // dummy data to avoid broken request

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, []) // fetch data when app is loaded, once

    const apiKey = '4e735581fbee47cab14163537193103' // your key here
    const requestUrl = `https://api.apixu.com/v1/current.json?key=${apiKey}&q=${capital}`
    useEffect(() => {
        //console.log('weather effect')
        axios
            .get(requestUrl)
            .then(response => {
                //console.log(response)
                setWeatherData(response.data)
            })
            .catch(error => {
                console.log(error)
            })        
    },[capital])  // fetch new weather data when capital changes

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value.toLowerCase())
    }

    return (
        <div>
            find countries 
            <input 
                value={nameFilter}
                onChange={handleNameFilterChange}
            />
            <MatchingCountries 
                countries={countries} 
                nameFilter={nameFilter} 
                handleShow={setNameFilter}
                setCapital={setCapital} 
                weatherData={weatherData} />            
        </div> 
    )
}

export default App