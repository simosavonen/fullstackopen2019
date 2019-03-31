import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {    
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(lang => 
                    <li key={lang.name}>{lang.name}</li>
                )}
            </ul>
            <img src={country.flag} width='300' alt={`flag of ${country.name}`} />
        </div>        
    )
}

const Country = (props) => {
    return (
        <tr>
            <td>{props.country.name}</td>
            <td>nappi</td>
        </tr>
    )
}

const MatchingCountries = (props) => {
    const { countries, nameFilter } = props
    const matches = countries.filter(c => c.name.toLowerCase().startsWith(nameFilter))
    //console.log('matching countries: ', matches)

    const rows = () => matches.map(country =>
        <Country key={country.name} country={country} />   
    )

    if(matches.length === 1) {
        return (
            <CountryDetails country={matches[0]} />
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

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

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
            <MatchingCountries countries={countries} nameFilter={nameFilter} />
        </div> 
    )
}

export default App