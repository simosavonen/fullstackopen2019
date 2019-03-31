import React from 'react'

const CountryDetails = ({ country }) => {    
    return (
        <div>
            <h1>{country.name}</h1>
            <p><b>capital: </b>{country.capital}</p>
            <p><b>population: </b>{country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(lang => 
                    <li key={lang.name}>{lang.name}</li>
                )}
            </ul>
            <img src={country.flag} width='200' alt={`flag of ${country.name}`} />
        </div>        
    )
}

export default CountryDetails