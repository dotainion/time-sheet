import React, { useEffect, useState } from 'react';
import { WidgetsInfo } from './WidgetsInfo';


export const RadioButton = ({onClick, parentCss, info, label, inputRef, value, id}) =>{
    const [checked, setChecked] = useState(false);
    
    const onTriggerChange = () =>{
        if (checked){
            setChecked(false);
            onClick?.(false);
        }else{
            setChecked(true);
            onClick?.(true);
        }
    }

    return(
        <WidgetsInfo info={info} cssClass={parentCss} inline>
            <input 
                className="input"
                onClick={onTriggerChange} 
                onChange={()=>{}}
                ref={inputRef} 
                type="radio" 
                checked={value !== undefined? value: checked} 
                style={{}}
                id={id}
            />
            <label>{label}</label>
        </WidgetsInfo>
    )
}