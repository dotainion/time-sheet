import React from "react";
import { WidgetsInfo } from "./WidgetsInfo";
import { MdDeleteForever } from 'react-icons/md';
import { AiFillMessage, AiOutlineEdit } from 'react-icons/ai';

export const Button = ({onClick, icon, cssClass, parentCss, label, info, style, parentStyle}) =>{
    const iconStyle = {
        marginRight:"5px"
    }
    
    return(
        <WidgetsInfo cssClass={parentCss} style={parentStyle} info={info} inline>
            <button
                onClick={onClick} 
                className={`btn ${cssClass}`} 
                style={{
                    ...style,
                    cursor:"pointer"
                }}
            >
                {icon === "delete" && <MdDeleteForever style={{...iconStyle}} />}
                {icon === "message" && <AiFillMessage style={{...iconStyle}} />}
                {icon === "edit" && <AiOutlineEdit style={{...iconStyle}} />}
                <label style={{cursor:"pointer"}}>{label}</label>
            </button>
        </WidgetsInfo>
    )
}