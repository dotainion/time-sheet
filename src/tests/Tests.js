import React, { useRef, useState } from 'react';
import { InputEntry } from '../components/widgets/InputEntry';
import { ContentsWrapper } from '../container/ContentsWrapper';


const getCoords = () =>{
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                console.log(pos.lat, pos.lng);
            }, () => {
                alert("unable to get location")
            }
        );
    } else {
        // Browser doesn't support Geolocation
        alert("not surported")
    }
}

export const Tests = () =>{
    return(
        <ContentsWrapper isOpen>
            <div className="float-center">
                <button onClick={getCoords}>Locate</button>
            </div>
        </ContentsWrapper>
    )
}