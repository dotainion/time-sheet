import React from 'react';
import { adminWelcome } from '../contents/Sentences';
import { useStore } from '../state/stateManagement';


export const Page404 = () =>{
    const { onContinue } = useStore();

    return (
        <div className="no-select">
            <p className="admin-welcome">{adminWelcome}</p>
            <div className="float-center ">
                <p><h1>page not found error</h1></p>
                <div className="centered inline">
                    <button className="btn btn-hover" style={{
                        backgroundColor:"dodgerblue",
                        color:"white",
                        fontSize:"20px",
                        marginLeft:"-20%"
                    }} onClick={onContinue}>Continue...</button>
                </div>
            </div>
            
        </div>
    )
}