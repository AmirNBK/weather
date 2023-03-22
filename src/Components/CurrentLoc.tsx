import React, { useEffect, useState } from 'react';
import './CurrentLoc.css';
import axios from 'axios'
import Lottie from 'react-lottie';
import clear from '../Assets/lotties/windy.json'
import cloudy from '../Assets/lotties/partlyCloudy.json'
import foggy from '../Assets/lotties/foggy.json'
import rain from '../Assets/lotties/partlyShower.json'
import freezingDrizzle from '../Assets/lotties/partlyShower.json'
import snow from '../Assets/lotties/snow.json'
import snowGrain from '../Assets/lotties/snow.json'
import thunderstorm from '../Assets/lotties/thunder.json'
import { AnimationItem } from 'lottie-web';

const Current = (props: { lat: string; long: string; temperatureUnit: boolean, searchedCity: string }) => {

    const lat = props.lat;
    const long = props.long;
    const searchedCity = props.searchedCity
    const temperatureUnit = props.temperatureUnit

    const [temp, setTemp] = useState("")
    const [city, setCity] = useState("")
    const [weatherCode, setWeatherCode] = useState("")
    const [description, setDescription] = useState("")
    const [weatherIcon, setWeatherIcon] = useState<AnimationItem>()
    const [minTemp, setMinTemp] = useState("")
    const [maxTemp, setMaxTemp] = useState("")

    useEffect(() => {
        getCity()
    }, [searchedCity])

    useEffect(() => {
        getDescription()
    }, [weatherCode])

    useEffect(() => {
        getPosition()
    }, [lat, long, temperatureUnit])


    const calculateAverage = (array) => {
        var total = 0;
        var count = 0;

        array.forEach(function (item, index) {
            total += item;
            count++;
        });

        return (total / count).toFixed(1);
    }
    const getPosition = () => {
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto&temperature_unit=${temperatureUnit}`)
            .then((response) => {
                setTemp(response.data.current_weather.temperature)
                setWeatherCode(response.data.current_weather.weathercode)
                setMinTemp(calculateAverage(response.data.daily.temperature_2m_min))
                setMaxTemp(calculateAverage(response.data.daily.temperature_2m_max))
            })
            .catch((error) => {

            })
            .then(() => {
                // always executed
            })
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: weatherIcon,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const getCity = () => {
        if (!searchedCity) {
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
        else {
            setCity(searchedCity)
        }
    }

    const getDescription = () => {
        if (weatherCode == "0") {
            setDescription("Clear sky")
            setWeatherIcon(clear)
        }
        if (weatherCode == "1" || weatherCode == "2" || weatherCode == "3") {
            setDescription("Mainly clear, partly cloudy, and overcast")
            setWeatherIcon(cloudy)
        }
        if (weatherCode == "45" || weatherCode == "58") {
            setDescription("Fog and depositing rime fog")
            setWeatherIcon(foggy)
        }
        if (weatherCode == "51" || weatherCode == "53" || weatherCode == "58") {
            setDescription("Drizzle: Light, moderate, and dense intensity")
            setWeatherIcon(rain)
        }
        if (weatherCode == "56" || weatherCode == "57") {
            setDescription("Freezing Drizzle: Light and dense intensity")
            setWeatherIcon(freezingDrizzle)
        }
        if (weatherCode == "61" || weatherCode == "63" || weatherCode == "65") {
            setDescription("Rain: Slight, moderate and heavy intensity")
            setWeatherIcon(rain)
        }
        if (weatherCode == "66" || weatherCode == "67") {
            setDescription("Freezing Rain: Light and heavy intensity")
            setWeatherIcon(freezingDrizzle)
        }
        if (weatherCode == "71" || weatherCode == "73" || weatherCode == "75") {
            setDescription("Snow fall: Slight, moderate, and heavy intensity")
            setWeatherIcon(snow)
        }
        if (weatherCode == "77") {
            setDescription("Snow grains")
            setWeatherIcon(snowGrain)
        }
        if (weatherCode == "80" || weatherCode == "81" || weatherCode == "82") {
            setDescription("Rain showers: Slight, moderate, and violent")
            setWeatherIcon(rain)
        }
        if (weatherCode == "85" || weatherCode == "86") {
            setDescription("Snow showers slight and heavy")
            setWeatherIcon(snow)
        }
        if (weatherCode == "95") {
            setDescription("Thunderstorm: Slight or moderate")
            setWeatherIcon(thunderstorm)

        }
        if (weatherCode == "96" || weatherCode == "99") {
            setDescription("Thunderstorm with slight and heavy hail")
            setWeatherIcon(thunderstorm)
        }
    }

    return (
        <div className='CurrentLocMainContainer'>
            <div className='CurrentLocMainContainer__city'> {city} </div>
            {window.innerWidth < 390 ?
                <Lottie
                    options={defaultOptions}
                    height={140}
                    width={140}
                />
                :
                <Lottie
                    options={defaultOptions}
                    height={200}
                    width={200}
                />
            }
            <div className='CurrentLocMainContainer__temp'> {temp}° </div>
            <div className='CurrentLocMainContainer__tempRange'>
                <div className='CurrentLocMainContainer__tempRange__left'> {minTemp}° </div>
                <div className='CurrentLocMainContainer__tempRange__right'> {maxTemp}° </div>
            </div>
            <div className='CurrentLocMainContainer__status'> {description} </div>
        </div>
    )
}
export default Current