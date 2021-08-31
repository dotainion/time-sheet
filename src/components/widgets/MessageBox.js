import React, { useEffect, useRef } from 'react';
import { SpanWrapper } from '../../container/SpanWrapper';


export const MessageBox = ({isOpen, onClose, onSendMessage, placeholder}) =>{
    const textareaRef = useRef();

    const onTriggerSend = () =>{
        onSendMessage({
            message: textareaRef.current.value
        });
        onClose?.();
    }

    useEffect(()=>{
        textareaRef.current.value = "";
    }, [isOpen]);
    return(
        <div hidden={!isOpen} onClose={onClose} className="backdrop">
            <div className="float-center user-notification-entery">
                <textarea ref={textareaRef} placeholder={placeholder || "Enter message here"} />
                <div style={{textAlign:"right",margin:"5px"}}>
                    <span onClick={onClose} style={{marginRight:"30px"}}>Cancel</span>
                    <button onClick={onTriggerSend} className="btn btn-hover">Add</button>
                </div>
            </div>
        </div>
    )
}