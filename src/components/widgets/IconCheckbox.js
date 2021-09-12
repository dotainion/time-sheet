import React, { useRef } from 'react';
import { FaUsers, FaUser } from 'react-icons/fa';
import { WidgetsInfo } from './WidgetsInfo';


export const IconCheckbox = ({info, style, onClick, disabled, cssClass, iconStyle, icon, label}) =>{
    const checkboxRef = useRef();

    const bStyle = {
        marginRight:"5px"
    }

    const triggerClick = () =>{
        if (disabled) return;
        checkboxRef.current?.click?.();
        const checked = checkboxRef.current?.checked;
        onClick?.(checked);
    }

    return(
        <WidgetsInfo info={info}>
            <button 
                className={`relative ${cssClass} ${disabled && "btn-disabled"}`} 
                style={{
                    ...style,
                    background: disabled && "dodgerblue",
                    cursor: disabled && "not-allowed"
                }}
            >
                {icon === "user" && <FaUser style={{...bStyle,...iconStyle}}/>}
                {icon === "users" && <FaUsers style={{...bStyle,...iconStyle}}/>}
                <input ref={checkboxRef} type="checkbox" />
                <span>{label}</span>
                <div onClick={triggerClick} className="float-center max-size" style={{zIndex:"1"}} />
            </button>
        </WidgetsInfo>
    )
}