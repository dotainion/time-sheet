import React from 'react';
import { WidgetsInfo } from './WidgetsInfo';


export const DateEntry = ({inputRef, disable, info, width, value, error, clearError}) =>{
    return(
        <WidgetsInfo info={!disable && info} error={error} inline>
            <span className="relative">
                <input 
                    className="input" 
                    type={"date"} 
                    style={{
                        width: width && `${width}px`,
                        color:disable && "gray",
                        backgroundColor:disable && "var(--input-disable)",
                        cursor:disable? "default": "text",
                        border:error && "1px solid red"
                    }} 
                    onChange={()=>clearError?.("")}
                    ref={inputRef}
                    value={value} 
                />
                <div
                    hidden={!disable}
                    className="float-center max-size"
                    style={{
                        paddingBottom:"7px",
                        top:"57.5%",
                        borderRadius:"6px",
                    }}
                />
            </span>
        </WidgetsInfo>
    )
}