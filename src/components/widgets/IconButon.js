import React from 'react';
import { IoMdDownload, IoMdSettings } from 'react-icons/io';
import { MdDateRange, MdRefresh, MdUpdate } from 'react-icons/md';
import { FaUser, FaUsers } from 'react-icons/fa';
import { WidgetsInfo } from './WidgetsInfo';


export const IconButton = ({hidden, info, style, infoStyle, onClick, disabled, cssClass, iconCss, infoCss, iconStyle, icon, label}) =>{
    const bStyle = {
        marginRight:"5px"
    }

    return(
        <WidgetsInfo info={info} cssClass={infoCss} infoStyle={infoStyle}>
            <button 
                hidden={hidden}
                onClick={onClick} 
                disabled={disabled} 
                className={`${cssClass} ${disabled && "btn-disabled"}`} 
                style={{
                    ...style,
                    cursor: disabled? "not-allowed": "pointer"
                }}
            >
                {icon === "user" && <FaUser className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "users" && <FaUsers className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "download" && <IoMdDownload className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "settings" && <IoMdSettings className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "calendar" && <MdDateRange className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "refresh" && <MdRefresh className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "update" && <MdUpdate className={iconCss} style={{...bStyle,...iconStyle}}/>}
                <span>{label}</span>
            </button>
        </WidgetsInfo>
    )
}