import React from 'react';

export const Backdrop = ({isOpen, onClose, onTop, style, children}) =>{
    const Z_INDEX = "9999999999999999999";
    return(
        <div
            hidden={!isOpen} 
            onClick={onClose}
            className="backdrop" 
            style={{zIndex: onTop && Z_INDEX, ...style}}>
            {children}
        </div>
    )
}