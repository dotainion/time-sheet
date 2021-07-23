import React from 'react';
import welcome from '../../images/welcome-poster.jpg';

export const Welcome = ({isOpen}) =>{
    return (
        <div hidden={!isOpen}>
            <div className="float-center">
                <img src={welcome} alt="" />
            </div>
        </div>
    )
}