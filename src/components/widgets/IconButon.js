import React from 'react';
import { IoMdDownload, IoMdSettings } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';
import { FaUser, FaUsers } from 'react-icons/fa';
import { WidgetsInfo } from './WidgetsInfo';


export const IconButton = ({info, style, onClick, disabled, cssClass, iconStyle, icon, label}) =>{
    const bStyle = {
        marginRight:"5px"
    }

    return(
        <WidgetsInfo info={info}>
            <button 
                onClick={onClick} 
                disabled={disabled} 
                className={`${cssClass} ${disabled && "btn-disabled"}`} 
                style={{
                    ...style,
                    background: disabled && "dodgerblue",
                    cursor: disabled && "not-allowed"
                }}
            >
                {icon === "user" && <FaUser style={{...bStyle,...iconStyle}}/>}
                {icon === "users" && <FaUsers style={{...bStyle,...iconStyle}}/>}
                {icon === "download" && <IoMdDownload style={{...bStyle,...iconStyle}}/>}
                {icon === "settings" && <IoMdSettings style={{...bStyle,...iconStyle}}/>}
                {icon === "calendar" && <MdDateRange style={{...bStyle,...iconStyle}}/>}
                <span>{label}</span>
            </button>
        </WidgetsInfo>
    )
}