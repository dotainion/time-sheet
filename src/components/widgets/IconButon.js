import React from 'react';
import { IoMdDownload, IoMdSettings } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';


export const IconButton = ({style, onClick, cssClass, iconStyle, icon, label}) =>{
    const bStyle = {
        marginRight:"5px"
    }
    return(
        <button onClick={onClick} className={cssClass} style={style}>
            {icon === "download" && <IoMdDownload style={{...bStyle,...iconStyle}}/>}
            {icon === "settings" && <IoMdSettings style={{...bStyle,...iconStyle}}/>}
            {icon === "calendar" && <MdDateRange style={{...bStyle,...iconStyle}}/>}
            <span>{label}</span>
        </button>
    )
}