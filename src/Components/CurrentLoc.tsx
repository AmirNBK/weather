import React, { useEffect, useState } from 'react';
import './CurrentLoc.css';
import axios from 'axios'
import rainy from '../Assets/rainy.svg'

const Current = () => {

    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [temp, setTemp] = useState("")
    const [city, setCity] = useState("")
    const [weatherCode, setWeatherCode] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        getCity()
        getDescription()
    }, [])

    const getPosition = (position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
        axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true&daily=apparent_temperature_max`)
            .then((response) => {
                // console.log(response.data)
                setTemp(response.data.current_weather.temperature)
                setWeatherCode(response.data.current_weather.weathercode)
                console.log(weatherCode)
            })
            .catch((error) => {
                // handle error
            })
            .then(() => {
                // always executed
            })

        getDescription()
    }

    window.navigator.geolocation
        .getCurrentPosition(getPosition, console.log);

    const getCity = () => {
        axios
            .get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
            .then((response) => {
                setCity(response.data.city)
            })
            .catch((error) => {
                // handle error
            })
            .then(() => {
                // always executed
            })
    }

    const getDescription = () => {
        if (weatherCode == "0") {
            setDescription("Clear sky")
        }
        if (weatherCode == "1" || weatherCode == "2" || weatherCode == "3") {
            setDescription("Mainly clear, partly cloudy, and overcast")
        }
        if (weatherCode == "45" || weatherCode == "58") {
            setDescription("Fog and depositing rime fog")
        }
        if (weatherCode == "51" || weatherCode == "53" || weatherCode == "58") {
            setDescription("Drizzle: Light, moderate, and dense intensity")
        }
        if (weatherCode == "56" || weatherCode == "57") {
            setDescription("Freezing Drizzle: Light and dense intensity")
        }
        if (weatherCode == "61" || weatherCode == "63" || weatherCode == "65") {
            setDescription("Rain: Slight, moderate and heavy intensity")
        }
        if (weatherCode == "66" || weatherCode == "67") {
            setDescription("Freezing Rain: Light and heavy intensity")
        }
        if (weatherCode == "71" || weatherCode == "73" || weatherCode == "75") {
            setDescription("Snow fall: Slight, moderate, and heavy intensity")
        }
        if (weatherCode == "77") {
            setDescription("Snow grains")
        }
        if (weatherCode == "80" || weatherCode == "81" || weatherCode == "82") {
            setDescription("Rain showers: Slight, moderate, and violent")
        }
        if (weatherCode == "85" || weatherCode == "86") {
            setDescription("Snow showers slight and heavy")
        }
        if (weatherCode == "95") {
            setDescription("Thunderstorm: Slight or moderate")
        }
        if (weatherCode == "96" || weatherCode == "99") {
            setDescription("Thunderstorm with slight and heavy hail")
        }
    }

    return (
        <div className='CurrentLocMainContainer'>
            <div className='CurrentLocMainContainer__city'> {city} </div>
            <img src={rainy} className='CurrentLocMainContainer__rainy' />
            <div className='CurrentLocMainContainer__temp'> {temp}° </div>
            <div className='CurrentLocMainContainer__tempRange'>
                <div className='CurrentLocMainContainer__tempRange__left'> 6° </div>
                <div className='CurrentLocMainContainer__tempRange__right'> 22° </div>
            </div>
            <div className='CurrentLocMainContainer__status'> {description} </div>
        </div>
    )
}
export default Current