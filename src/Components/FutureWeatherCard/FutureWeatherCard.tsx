import React, { useEffect, useState } from 'react';
import './FutureWeatherCard.css'
import clear from '../../Assets/clear.svg'
import cloudy from '../../Assets/cloudy.svg'
import foggy from '../../Assets/foggy.svg'
import drizzle from '../../Assets/drizzle.svg'
import freezingDrizzle from '../../Assets/freezingDrizzle.svg'
import rain from '../../Assets/rain.svg'
import snowGrain from '../../Assets/snowGrain.svg'
import snow from '../../Assets/snow.svg'
import thunderstorm from '../../Assets/thunderstorm.svg'

const FutureWeatherCard = (props: { day: string; weatherCode: any }) => {
    const day = props.day
    const weatherCode = props.weatherCode

    const [weatherIcon, setWeatherIcon] = useState()

    useEffect(() => {
        getDescription()
    }, [weatherCode])


    const getDescription = () => {
        if (weatherCode == "0") {
            setWeatherIcon(clear)
        }
        if (weatherCode == "1" || weatherCode == "2" || weatherCode == "3") {
            setWeatherIcon(cloudy)
        }
        if (weatherCode == "45" || weatherCode == "58") {
            setWeatherIcon(foggy)
        }
        if (weatherCode == "51" || weatherCode == "53" || weatherCode == "58") {
            setWeatherIcon(drizzle)
        }
        if (weatherCode == "56" || weatherCode == "57") {
            setWeatherIcon(freezingDrizzle)
        }
        if (weatherCode == "61" || weatherCode == "63" || weatherCode == "65") {
            setWeatherIcon(rain)
        }
        if (weatherCode == "66" || weatherCode == "67") {
            setWeatherIcon(freezingDrizzle)
        }
        if (weatherCode == "71" || weatherCode == "73" || weatherCode == "75") {
            setWeatherIcon(snow)
        }
        if (weatherCode == "77") {
            setWeatherIcon(snowGrain)
        }
        if (weatherCode == "80" || weatherCode == "81" || weatherCode == "82") {
            setWeatherIcon(rain)
        }
        if (weatherCode == "85" || weatherCode == "86") {
            setWeatherIcon(snow)
        }
        if (weatherCode == "95") {
            setWeatherIcon(thunderstorm)

        }
        if (weatherCode == "96" || weatherCode == "99") {
            setWeatherIcon(thunderstorm)
        }
    }
    return (
        <div className='FutureWeatherCard'>
            <div className='FutureWeatherCard__day'> {day} </div>
            <img src={weatherIcon} />
        </div>
    );
};

export default FutureWeatherCard;