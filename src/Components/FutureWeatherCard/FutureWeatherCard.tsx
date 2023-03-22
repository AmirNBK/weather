import React, { useEffect, useState } from 'react';
import './FutureWeatherCard.css'
import clear from '../../Assets/lotties/windy.json'
import cloudy from '../../Assets/lotties/partlyCloudy.json'
import foggy from '../../Assets/lotties/foggy.json'
import rain from '../../Assets/lotties/partlyShower.json'
import freezingDrizzle from '../../Assets/lotties/partlyShower.json'
import snow from '../../Assets/lotties/snow.json'
import snowGrain from '../../Assets/lotties/snow.json'
import thunderstorm from '../../Assets/lotties/thunder.json'
import Lottie from 'react-lottie';

const FutureWeatherCard = (props: { day: string; weatherCode: any }) => {
    const day = props.day
    const weatherCode = props.weatherCode

    const [weatherIcon, setWeatherIcon] = useState()

    useEffect(() => {
        getDescription()
    }, [weatherCode])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: weatherIcon,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


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
            setWeatherIcon(rain)
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
            <Lottie
                options={defaultOptions}
                height={80}
                width={80}
            />
        </div>
    );
};

export default FutureWeatherCard;