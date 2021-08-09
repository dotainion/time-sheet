import React, { useEffect, useState } from 'react';


export const InputSelect = ({label, inputRef, options, defaultOption, disabled, hidden, error, errorReset}) =>{
    return(
        <div 
            hidden={hidden}
            className="relative half-width max-width-on-mobile"
            style={{
                marginTop:"20px",
                marginBottom:"20px",
            }}
        >
            <div
                className="float-left" 
                style={{top:"-9px"}}
            >{label}</div>
            <select 
                disabled={disabled} 
                ref={inputRef} 
                onChange={()=>errorReset("")}
                style={{
                    backgroundColor:disabled && "rgb(192, 217, 245)",
                    color:disabled && "gray",
                    border:error && "1px solid red"
                }} 
                className={`input-entery ${!disabled && "input-hover"}`}
            >
                <option hidden defaultChecked>{defaultOption}</option>
                {options?.map?.((role, key)=>(
                    <option key={key}>{role}</option>
                ))}
            </select>
            <div
                className="float-bottom-overflow"
                style={{
                    left:"0",
                    color: "orangered",
                    fontSize:"12px",
                    transform:"translate3d(0, 80%, 0)"
                }}
            >{error}</div>
        </div>
    )
}