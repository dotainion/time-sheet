import React from 'react';
import { WidgetsInfo } from './WidgetsInfo';


export const InputCheckbox = ({info, cssClass, label}) =>{
    return(
        <WidgetsInfo info={info}>
            <label className={`input-checkbox ${cssClass}`}>
                <span>
                    <input type="checkbox"/>
                </span>
                <label style={{marginLeft:"5px"}}>{label}</label>
            </label>
        </WidgetsInfo>
    )
}