import React from 'react';
import { WidgetsInfo } from './WidgetsInfo';


export const SelectOptions = ({inputRef, onChange, defaultValue, disable, info, options, error, clearError}) =>{
    const triggerChanges = (e) =>{
        clearError?.("");
        onChange?.(e.target.value);
    }
    return(
        <WidgetsInfo info={!disable && info} error={error} inline>
            <select 
                disabled={disable} 
                className="input" 
                ref={inputRef}
                onChange={triggerChanges}
                style={{
                    backgroundColor:disable && "var(--input-disable)",
                    border:error && "1px solid red" || disable && "1px solid var(--border)",
                    cursor:disable && "default",
                }}>
                <option hidden defaultChecked>{options?.[0] || defaultValue}</option>
                {options?.map((opt, key)=>(
                    <option key={key}>{opt}</option>
                ))}
            </select>
        </WidgetsInfo>
    )
}