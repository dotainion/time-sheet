import React from 'react';
import { adminWelcome } from '../contents/Sentences';
import welcome from '../images/welcome-poster.jpg';
import { useStore } from '../state/stateManagement';

export const Welcome = () =>{
    const { onContinue } = useStore();

    return (
        <div className="float-top-center no-select">
            <img src={welcome} alt="" draggable={false} />
            <p className="admin-welcome">{adminWelcome}</p>
            <div className="centered inline">
                <button className="btn btn-hover" style={{
                    backgroundColor:"dodgerblue",
                    color:"white",
                    fontSize:"20px",
                    marginLeft:"-10%"
                }} onClick={onContinue}>Continue...</button>
            </div>
        </div>
    )
}