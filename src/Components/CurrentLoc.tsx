import React, { useEffect, useState } from 'react';
import './CurrentLoc.css';
import axios from 'axios'
import rainy from '../Assets/rainy.svg'

const Current = () => {

    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [temp, setTemp] = useState("")
    const [city,setCity] = useState("")

    useEffect(() => {
        getCity()
    }, [])

    const getPosition = (position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
        axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true`)
            .then((response) => {
                setTemp(response.data.current_weather.temperature)
            })
            .catch((error) => {
                // handle error
            })
            .then(() => {
                // always executed
            })

    }

    window.navigator.geolocation
        .getCurrentPosition(getPosition, console.log);

    const getCity = () => {
        axios
            .get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
            .then((response) => {
                console.log(response.data)
                setCity(response.data.city)
            })
            .catch((error) => {
                // handle error
            })
            .then(() => {
                // always executed
            })
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
            <div className='CurrentLocMainContainer__status'> Scattered thundershowers </div>
        </div>
    )
}
export default Current