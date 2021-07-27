import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export const Modal = ({isOpen, onClose, children}) =>{
    return(
        <div hidden={!isOpen} className="modal float-center">
            <AiOutlineClose
                className="float-top-right"
                onClick={onClose}
                style={{color:"red",margin:"3px",zIndex:"9999"}}
            />
            <div className="relative">
                {children}
            </div>
        </div>
    )
}