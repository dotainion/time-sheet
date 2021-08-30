import React, { useEffect, useRef } from 'react';
import { SpanWrapper } from '../../container/SpanWrapper';


export const MessageBox = ({isOpen, onClose, onSendMessage, header}) =>{
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
        <SpanWrapper isOpen={isOpen} onClose={onClose} style={{boxShadow:"2px 2px 5px var(--box-shadow-dark-fade)"}}>
            <div style={{paddingLeft:"10px",color:"white"}}>Notification <span style={{color:"orange"}}>{header}</span></div>
            <div className="pad">
                <textarea ref={textareaRef} className="input-textarea" placeholder="Enter message here" />
                <div style={{textAlign:"right",marginTop:"10px"}}>
                    <label onClick={onClose} className="no-select" style={{color:"white",marginRight:"20px",cursor:"pointer"}} >Cencel</label>
                    <button onClick={onTriggerSend} className="btn btn-hover" >Send</button>
                </div>
            </div>
        </SpanWrapper>
    )
}