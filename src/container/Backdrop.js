import React from 'react';

export const Backdrop = ({isOpen, onClose, onTop, children}) =>{
    const Z_INDEX = "9999999999999999999";
    return(
        <div
            hidden={!isOpen} 
            onClick={onClose && onClose}
            className="backdrop" 
            style={{zIndex: onTop && Z_INDEX}}>
            {children}
        </div>
    )
}