import React from 'react';


export const SelectOptions  = ({onChange, options, cssClass, defaultValue, style}) =>{
    const triggerChanges = (e) =>{
        for (let elemets of options || []){
            if (elemets?.command){
                if (elemets?.value === e.target.value || elemets?.title === e.target.value){
                    elemets?.command?.(elemets?.value  || elemets?.title);
                }
            }
        }
        onChange?.(e);
    }
    return(
        <select hidden={!options} onChange={triggerChanges} className={`input ${cssClass}`} style={style}>
            <option hidden defaultChecked>{defaultValue || options?.[0]?.title}</option>
            {options?.map?.((opt, key)=>(
                <option onClick={()=>alert("hello wthi sis me")} value={opt?.value || opt?.title} key={key}>{opt?.title}</option>
            ))}
        </select>
    )
}