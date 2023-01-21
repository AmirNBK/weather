import React, { useEffect, useState } from 'react';
import './Future.css';
import axios from 'axios'

const FutureWeather = (props: { lat: string; long: string }) => {

    const lat = props.lat;
    const long = props.long;

    useEffect(() => {
        getResponse()
    }, [])

    const [weekday, setWeekday] = useState([])
    const [weatherCode, setWeatherCode] = useState([])

    const getResponse = () => {
        axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
            .then((response) => {
                console.log(response.data)
                setWeekday(response.data.daily.time)
                setWeatherCode(response.data.daily.weathercode)
            })
            .catch((error) => {

            })
            .then(() => {
                // always executed
            })
    }

    return (
        <div className='futureWeatherContainer'>
            {weekday.slice(1).map((item, index) => {
                return (
                    <div className='futureWeatherContainer__day' key={index}> {item} </div>
                )
            })}
        </div>
    )
}
export default FutureWeather;