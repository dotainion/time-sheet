import React from 'react';
import { WidgetsInfo } from './WidgetsInfo';


export const InputCheckbox = ({info, inputRef, onChange, defaultChecked, stopPropagation, cssClass, inputStyle, label, id}) =>{
    const onChanged = (e) =>{
        onChange?.(e.target.checked);
    }
    return(
        <WidgetsInfo onClick={e=>stopPropagation && e.stopPropagation()} info={info}>
            <label className={`input-checkbox ${cssClass}`}>
                <span>
                    <input ref={inputRef} onChange={onChanged} defaultChecked={defaultChecked} type="checkbox" style={inputStyle} id={id}/>
                </span>
                <label style={{marginLeft:"5px"}}>{label}</label>
            </label>
        </WidgetsInfo>
    )
}