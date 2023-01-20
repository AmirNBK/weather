import React, { useEffect, useState } from 'react';
import './Future.css';

const FutureWeather = () => {

    const [weekday, setWeekday] = useState([])

    const getDayName = (dateStr, locale) => {
        var date = new Date(dateStr);
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    // date.setDate(date.getDate() + 5);

    for (let index = 1; index <= 5; index++) {
        var date = new Date();
        date.setDate(date.getDate() + index);
        weekday.push(getDayName(date.toLocaleDateString(),'en-us'))
    }

    return (
        <div className='futureWeatherContainer'>
            {weekday.map((item, index) => {
                return (
                    <div className='futureWeatherContainer__day'> {item} </div>
                )
            })}
        </div>
    )
}
export default FutureWeather;