import React from 'react'

const Weather = ({ weatherData }) => {   
    if(weatherData === null) {
        return null
    }
    //console.log(weatherData)
    return(
        <div>
            <h2>Weather in {weatherData.location.name}</h2>
            <p>
                <b>temperature: </b> 
                {weatherData.current.temp_c} Celcius
            </p>
            <img src={weatherData.current.condition.icon} 
                alt={weatherData.current.condition.text}
                />
            <p>
                <b>wind: </b> 
                {weatherData.current.wind_kph} kph 
                direction {weatherData.current.wind_dir}
            </p>
        </div>
    )        
}

export default Weather