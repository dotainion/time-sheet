import React from 'react';


export const TrackerButton = ({onClick, hidden, cssClass, style, color, label}) =>{
    return(
        <div hidden={hidden} onClick={onClick} className={`time-btn ${cssClass}`} style={{...style}}>
            <div className="time-inner-btn" style={{border:`1px solid ${color}`}}>
                <div className="max-size">
                    <div className="float-center">
                        {label}
                    </div>
                </div>
            </div>
        </div>
    )
}