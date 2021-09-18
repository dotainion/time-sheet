import React from 'react';
import { WidgetsInfo } from './WidgetsInfo';


export const InputCheckbox = ({info, inputRef, onChange, cssClass, label}) =>{
    const onChanged = (e) =>{
        onChange?.(e.target.checked);
    }
    return(
        <WidgetsInfo info={info}>
            <label className={`input-checkbox ${cssClass}`}>
                <span>
                    <input ref={inputRef} onChange={onChanged} type="checkbox"/>
                </span>
                <label style={{marginLeft:"5px"}}>{label}</label>
            </label>
        </WidgetsInfo>
    )
}