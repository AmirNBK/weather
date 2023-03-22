'use strict'
import React, { useEffect, useState } from 'react';
import Current from './CurrentLoc.tsx';
import './MainContainer.css'
import FutureWeather from './Future.tsx'
import InputSwitch from './InputSwitch/InputSwitch.tsx';
import { AutoComplete } from "primereact/autocomplete";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import fahrenheit from '../Assets/fahrenheit.svg'
import celsius from '../Assets/celsius.svg'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from 'axios';
import TemperatureUnitSwitch from './TemperatureUnitSwitch/TemperatureUnitSwitch.tsx';
import './MainContainer.css'


const Main = () => {
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [temperatureUnit, setTemperatureUnit] = useState('celsius')
    const [value, setValue] = useState<string>();
    const [items, setItems] = useState<string[]>([]);
    const [searchedCity, setSearchedCity] = useState()
    const [coordinates, setCoordinates] = useState(null);
    const [changeData, setChangeData] = useState(false)

    async function handleSearch(cityName) {
        setChangeData(false)
        setValue(cityName)
        const apiKey = 'pk.eyJ1IjoiYW1pcm5iayIsImEiOiJja3JjY210cWYwam53MzBwZW1yYTZtN2phIn0.5Jx88DAjR4jh0QJ-kXHYoQ'; // Replace with your own Mapbox API key
        const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cityName)}.json?access_token=${apiKey}`;
        try {
            const response = await axios.get(geocodeUrl);
            setItems(response.data.features.map((item) => {
                return item.place_name
            }))

            if (changeData) {
                setLong(response.data.features[0].center[0])
                setLat(response.data.features[0].center[1])
                if (!(response.data.query[0] === undefined)) {
                    setSearchedCity(response.data.features[0].text)
                }
            }



        } catch (error) {
            console.error(error);
            setCoordinates(null);
        }
    }

    useEffect(() => {
        handleSearch(value)
    }, [value])

    const search = (event: AutoCompleteCompleteEvent) => {
        setItems(items.map((item) => {
            return item
        }))
    }

    const getPosition = (position) => {
        if (!value) {
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
        }
    }

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTemperatureUnit('fahrenheit')
        }
        else setTemperatureUnit('celsius')
    }


    window.navigator.geolocation
        .getCurrentPosition(getPosition);

    return (
        <div className='MainContainer'>
            <div className='MainContainer__top'>
                <AutoComplete value={value} suggestions={items} onSelect={() => setChangeData(true)} className='MainContainer__top__input'
                    completeMethod={search} placeholder='Search for a city' onChange={(e) => handleSearch(e.value)} />
                <TemperatureUnitSwitch handleToggle={handleToggle} />
            </div>
            <div>
                <Current lat={lat} long={long} temperatureUnit={temperatureUnit} searchedCity={searchedCity} />
                <FutureWeather lat={lat} long={long} />
            </div>
        </div>
    )
}
export default Main;