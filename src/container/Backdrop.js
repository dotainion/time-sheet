import React from 'react';

export const Backdrop = ({isOpen, children}) =>{
    return(
        <div hidden={!isOpen} className="backdrop">
            {children}
        </div>
    )
}