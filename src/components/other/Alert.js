import React from 'react';
import { SpanWrapper } from '../../container/SpanWrapper';


export const Alert = ({isOpen, onClose, header, message}) =>{
    return(
        <SpanWrapper isOpen={isOpen}>
            <div
                style={{
                    width: "350px",
                    padding: "10px",
                    borderRadius:"5px",
                    boxShadow:"2px 2px 10px var(--shadow-dark)"
                }}
            >
                <div style={{fontSize:"20px"}}><b>{header || "Alert!!"}</b></div>
                <p>{message}</p>
                <div style={{textAlign:"right"}}>
                    <button onClick={onClose} className="btn" style={{marginRight:"20px"}}>Ok</button>
                </div>
            </div>
        </SpanWrapper>
    )
}