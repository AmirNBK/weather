import React, { useState } from "react";
import './TemperatureUnitSwitch.css'

const TemperatureUnitSwitch = () => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        ''
    )
}

export default TemperatureUnitSwitch;
