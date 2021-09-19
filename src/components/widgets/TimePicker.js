import React, { useRef } from 'react';
import { WidgetsInfo } from './WidgetsInfo';


export const TimePicker = ({onChange, info, inputRef, error, clearError}) =>{
    const triggerChange = (e) =>{
        clearError?.("");
        onChange?.(e.target.value);
    }
    //<WidgetsInfo info={info} error={error} inline>
    return(
        <WidgetsInfo info={info} error={error} inline>
            <input
                className="input" 
                type="time"
                ref={inputRef}
                onChange={triggerChange}
                style={{
                    border:error && "1px solid red"
                }}
            />
        </WidgetsInfo>
    )
}