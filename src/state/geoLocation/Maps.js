import React, { Component, useEffect } from 'react';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, ()=>{},{
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude)
  console.log("Longitude: " + position.coords.longitude)
  console.log("accuracy: " + position.accuracy)

  codeLatLng(position.coords.latitude, position.coords.longitude);
}

function codeLatLng(lat, lng) {

}

export const SimpleMap = () =>{
  
    useEffect(()=>{
        getLocation();
    }, []);
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        teting location
      </div>
    );
}
