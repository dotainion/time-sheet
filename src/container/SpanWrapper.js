import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export const SpanWrapper = ({isOpen, onClose, cssClass, style, zIndex, shadow, children}) =>{
    return(
        <div 
            hidden={!isOpen} 
            className={`float-center ${cssClass}`}
            style={{
                zIndex:zIndex?zIndex:"99999",
                boxShadow: shadow&& "2px 2px 10px var(--shadow-dark)",
                ...style
            }}>
            <AiOutlineClose
                className="float-top-right"
                onClick={onClose}
                style={{color:"red",margin:"3px",zIndex:"9999",display:!onClose && "none"}}
            />
            <div className="span-wrapper">
                {children}
            </div>
        </div>
    )
}