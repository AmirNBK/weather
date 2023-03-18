'use strict'
import React, { useState } from 'react';
import Current from './CurrentLoc.tsx';
import './MainContainer.css'
import FutureWeather from './Future.tsx'
import InputSwitch from './InputSwitch/InputSwitch.tsx';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import fahrenheit from '../Assets/fahrenheit.svg'
import celsius from '../Assets/celsius.svg'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TemperatureUnitSwitch from './TemperatureUnitSwitch/TemperatureUnitSwitch.tsx';


const Main = () => {
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [checked, setChecked] = useState(false);

    const getPosition = (position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
    }

    window.navigator.geolocation
        .getCurrentPosition(getPosition);

    return (
        <div className='MainContainer'>
            <div className='' style={{ textAlign: 'right' }}>
                <TemperatureUnitSwitch/>
            </div>
            <Current lat={lat} long={long} />
            <FutureWeather lat={lat} long={long} />
        </div>
    )
}
export default Main;