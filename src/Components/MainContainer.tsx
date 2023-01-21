import React, { useState } from 'react';
import Current from './CurrentLoc.tsx';
import './MainContainer.css'
import FutureWeather from './Future.tsx'

const Main = () => {
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")

    const getPosition = (position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
    }

    window.navigator.geolocation
        .getCurrentPosition(getPosition);
        

    return (
        <div className='MainContainer'>
            <Current lat={lat} long={long} />
            <FutureWeather lat={lat} long={long} />
        </div>
    )
}
export default Main;