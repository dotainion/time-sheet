import React from 'react';


export const SelectOptions  = ({onChange, options, cssClass, defaultValue, style}) =>{
    return(
        <select hidden={!options} onChange={onChange} className={`input ${cssClass}`} style={style}>
            <option hidden defaultChecked>{defaultValue || options?.[0]?.title}</option>
            {options?.map?.((opt, key)=>(
                <option value={opt?.value || opt?.title} key={key}>{opt?.title}</option>
            ))}
        </select>
    )
}