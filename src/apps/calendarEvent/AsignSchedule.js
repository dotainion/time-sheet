import React, { useEffect, useRef } from 'react';
import { Backdrop } from '../../container/Backdrop';
import { SpanWrapper } from '../../container/SpanWrapper';
import { useStore } from '../../state/stateManagement/stateManagement';

export const AsignSchedule = ({isOpen, onClose, onAdd, onEdit, valueObj, zIndex}) =>{
    const { settings } = useStore();
    const commentRef = useRef();
    const durationRef = useRef();

    const onTriggerAdd = () =>{
        if (!durationRef.current.value) return alert("Must add duration");
        try{
            if (valueObj !== null) onEdit?.({
                comment: commentRef.current.value,
                index: valueObj?.index,
                date: valueObj?.time?.date,
                duration: durationRef.current.value
            });
            else onAdd?.({
                comment:commentRef.current.value,
                duration: durationRef.current.value
            });
        }catch(error){
            console.log(error);
        }finally{
            onTriggerClose();
        }
    }

    const onTriggerClose = () =>{
        commentRef.current.value = "";
        durationRef.current.value = "";
        onClose?.();
    }

    useEffect(()=>{
        if (valueObj !== null){
            const {time, index} = valueObj;
            const {comment, date, duration} = time;
            commentRef.current.value = comment;
            durationRef.current.value = duration;
        }else{
            durationRef.current.value = settings?.durationDefault;
        }
    }, [valueObj, isOpen]);
    return(
        <Backdrop isOpen={isOpen} >
            <SpanWrapper isOpen onClose={onTriggerClose} zIndex={zIndex}>
                <div className="add-task">
                    <div>Asign Schedule</div>
                    <div className="relative">
                        <textarea ref={commentRef} className="input input-hover" rows={5} style={{width:"288px",resize:"none"}} placeholder="Add comments here" />
                    </div>
                    <div className="flex">
                        <div className="max-width relative">
                            <div className="float-top-left" style={{top:"-10px"}}>Duration hour(s)</div>
                            <span><input ref={durationRef} className="input input-hover" style={{width:"100px",textAlign:"left"}} placeholder="Duration" type="number" /></span>
                        </div>
                        <div className="max-width relative" style={{textAlign:"right"}}>
                            <div className="float-center max-width">
                                <button onClick={onTriggerAdd} className="btn btn-hover" style={{marginRight:"10px",color:"teal"}}>Add</button>
                                <button onClick={onTriggerClose} className="btn btn-hover" style={{color:"red"}}>Cencel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </SpanWrapper>
        </Backdrop>
    )
}