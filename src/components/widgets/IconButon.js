import React from 'react';
import { IoMdClose, IoMdDownload, IoMdSettings } from 'react-icons/io';
import { MdDateRange, MdRefresh, MdUpdate, MdNotificationsActive } from 'react-icons/md';
import { FaUser, FaUsers } from 'react-icons/fa';
import { WidgetsInfo } from './WidgetsInfo';
import { GiPush } from 'react-icons/gi';
import { IoTimeSharp } from 'react-icons/io5';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';


export const IconButton = ({hidden, border, info, style, infoStyle, onClick, disabled, cssClass, iconCss, infoCss, iconStyle, icon, label}) =>{
    const bStyle = {
        marginRight:"5px"
    }

    return(
        <WidgetsInfo info={info} cssClass={infoCss} infoStyle={infoStyle}>
            <button 
                hidden={hidden}
                onClick={onClick} 
                disabled={disabled} 
                className={`icon-btn ${cssClass} ${disabled && "btn-disabled"}`} 
                style={{
                    ...style,
                    border: border,
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
                {icon === "send" && <GiPush className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "notification" && <MdNotificationsActive className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "log" && <IoTimeSharp className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "email" && <AiOutlineMail className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "password" && <RiLockPasswordLine className={iconCss} style={{...bStyle,...iconStyle}}/>}
                {icon === "close" && <IoMdClose className={iconCss} style={{...bStyle,...iconStyle}}/>}
                <span>{label}</span>
            </button>
        </WidgetsInfo>
    )
}