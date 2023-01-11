import React from 'react';
import Current from './CurrentLoc.tsx';
import './MainContainer.css'
import FutureWeather from './Future.tsx'

const Main = () => {
    return (
        <div className='MainContainer'>
            <Current/>
            <FutureWeather/>
        </div>
    )
}
export default Main;