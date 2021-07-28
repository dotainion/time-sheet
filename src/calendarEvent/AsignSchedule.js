import React, { useEffect, useRef, useState } from 'react';
import { Backdrop } from '../container/Backdrop';
import { SpanWrapper } from '../container/SpanWrapper';

export const AsignSchedule = ({isOpen, onClose, onAdd, onEdit, valueObj, zIndex}) =>{
    const commentRef = useRef();

    const onTriggerAdd = () =>{
        try{
            if (valueObj !== null) onEdit?.({
                comment: commentRef.current.value,
                index: valueObj?.index,
                date: valueObj?.time?.date
            });
            else onAdd?.(commentRef.current.value);
        }catch(error){
            console.log(error);
        }finally{
            commentRef.current.value = "";
            onClose?.();
        }
    }

    useEffect(()=>{
        if (valueObj !== null){
            const {time, index} = valueObj;
            const {comment, date} = time;
            commentRef.current.value = comment;
        }
    }, [valueObj]);
    return(
        <Backdrop isOpen={isOpen} >
            <SpanWrapper isOpen onClose={onClose} zIndex={zIndex}>
                <div className="add-task">
                    <div style={{}}>Comments</div>
                    <div className="relative max-width">
                        <textarea ref={commentRef} className="input centered" rows={5} style={{width:"290px",resize:"none"}} />
                    </div>
                    <div style={{textAlign:"right"}}>
                        <button onClick={onTriggerAdd} className="btn" style={{marginRight:"10px",color:"teal"}}>Add</button>
                        <button onClick={onClose} className="btn" style={{color:"red"}}>Cencel</button>
                    </div>
                </div>
            </SpanWrapper>
        </Backdrop>
    )
}