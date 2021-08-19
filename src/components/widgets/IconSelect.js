import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { FaUsers } from 'react-icons/fa';
import { SelectOptions } from './SelectOptions';


export const IconSelect = ({style, hidden, cssSelectClass, selectStyle, icon, iconStyle, onChange, options, cssClass, defaultValue}) =>{
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
    return(
        <button hidden={hidden} className={cssClass} style={style}>
            {icon === "people" && <FaUsers style={{...bStyle,...iconStyle}}/>}
            {icon === "settings" && <IoMdSettings style={{...bStyle,...iconStyle}}/>}
            <SelectOptions 
                options={options}
                onChange={onChange}
                defaultValue={defaultValue}
                cssOverride 
                cssClass={cssSelectClass}
                style={{...s_selectStyle,...selectStyle}} />
        </button>
    )
}