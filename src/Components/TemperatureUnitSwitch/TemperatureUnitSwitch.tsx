import React, { useState } from "react";
import './TemperatureUnitSwitch.css'

const TemperatureUnitSwitch = (props: {
    handleToggle: boolean
}) => {
    const handleToggle = props.handleToggle

    return (
        <div className="TemperatureUnitSwitch">
            <div className="toggle-button-cover">
                <div className="button r" id="button-1">
                    <input type="checkbox" className="checkbox" onChange={handleToggle} />
                    <div className="knobs"></div>
                    <div className="layer"></div>
                </div>
            </div>
        </div>
    )
}

export default TemperatureUnitSwitch;
