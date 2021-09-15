import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { FaUsers, FaUser } from 'react-icons/fa';
import { SelectOptions } from './SelectOptions';
import { WidgetsInfo } from './WidgetsInfo';


export const IconSelect = ({info, style, error, errorReset, hidden, cssSelectClass, selectStyle, icon, iconStyle, onChange, options, cssClass, defaultValue}) =>{
    const bStyle = {
        marginRight:"1px"
    }

    const s_selectStyle = {
        color:"inherit",
        border:"none",
        backgroundColor:"inherit",
        outline:"none",
        marginTop:"1px",
        marginBottom:"-1px",
    }

    const onTriggerChange = (change) =>{
        onChange?.(change);
        errorReset?.("");
    }
    return(
        <WidgetsInfo info={info} error={error}>
            <button hidden={hidden} className={cssClass} style={{...style, border:error && "1px solid orangered"}}>
                {icon === "user" && <FaUser style={{...bStyle,...iconStyle}}/>}
                {icon === "users" && <FaUsers style={{...bStyle,...iconStyle}}/>}
                {icon === "settings" && <IoMdSettings style={{...bStyle,...iconStyle}}/>}
                <SelectOptions 
                    options={options}
                    onChange={onTriggerChange}
                    defaultValue={defaultValue}
                    cssOverride 
                    cssClass={cssSelectClass}
                    style={{
                        ...s_selectStyle,
                        ...selectStyle,
                        cursor:"pointer"
                    }}
                />
            </button>
        </WidgetsInfo>
    )
}