import React from 'react';
import { adminWelcome } from '../../contents/Sentences';
import welcome from '../../images/welcome-poster.jpg';

export const Welcome = ({isOpen}) =>{
    return (
        <div hidden={!isOpen}>
            <div className="float-center no-select">
                <img src={welcome} alt="" draggable={false} />
                <p className="admin-welcome">{adminWelcome}</p>
            </div>
        </div>
    )
}