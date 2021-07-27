import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export const SpanWrapper = ({isOpen, onClose, zIndex, children}) =>{
    return(
        <div hidden={!isOpen} className="float-center" style={{zIndex:zIndex?zIndex:"99999"}}>
            <AiOutlineClose
                className="float-top-right"
                onClick={onClose}
                style={{color:"red",margin:"3px",zIndex:"9999"}}
            />
            <div className="span-wrapper">
                {children}
            </div>
        </div>
    )
}