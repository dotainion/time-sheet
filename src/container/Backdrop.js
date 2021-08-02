import React from 'react';

export const Backdrop = ({isOpen, onTop, children}) =>{
    const Z_INDEX = "9999999999999999999";
    return(
        <div
            hidden={!isOpen} 
            className="backdrop" 
            style={{zIndex: onTop && Z_INDEX}}>
            {children}
        </div>
    )
}