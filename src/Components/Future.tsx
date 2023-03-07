import React, { useEffect, useState } from 'react';
import './Future.css';
import axios from 'axios'
import FutureWeatherCard from './FutureWeatherCard/FutureWeatherCard.tsx';
import clear from '../Assets/clear.svg'

const FutureWeather = (props: { lat: any; long: any }) => {

    const lat = props.lat;
    const long = props.long;

    useEffect(() => {
        getResponse()
    }, [])

    const [weekday, setWeekday] = useState([])
    const [weatherCode, setWeatherCode] = useState([])

    const getDayName = (dateStr, locale) => {
        var date = new Date(dateStr);
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    const getResponse = () => {
        axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
            .then((response) => {
                console.log(response);
                setWeatherCode(response.data.daily.weathercode)
            })
            .catch((error) => {

            })
            .then(() => {
                // always executed
            })
    }


    for (let index = 1; index <= 5; index++) {
        var date = new Date();
        date.setDate(date.getDate() + index);
        weekday.push(getDayName(date.toLocaleDateString(), 'en-us'))
    }

    return (
        <div className='futureWeatherContainer'>
            {weekday.slice(0, 5).map((item, index) => {
                const code = weatherCode[index];
                return (
                    <FutureWeatherCard day={item} weatherCode={code} />
                )
            })}
        </div>
    )
}
export default FutureWeather;