import React, { useEffect, useRef, useState } from 'react';
import { SpanWrapper } from '../container/SpanWrapper';

export const AsignSchedule = ({isOpen, onClose, memberSelected, members, zIndex}) =>{
    const userRef = useRef();

    const onAsign = () =>{
        const userObj = JSON.parse(userRef.current.value);
        const name = `${userObj?.info?.firstName} ${userObj?.info?.lastName}`;
        onClose?.();
    }

    useEffect(()=>{
        userRef.current.value = JSON.stringify(memberSelected);
    }, [memberSelected]);

    return(
        <SpanWrapper isOpen={isOpen} onClose={onClose} zIndex={zIndex}>
            <div className="add-task">
                <div className="pad centered">
                    <select hidden={!members} ref={userRef} className="input">
                        <option hidden defaultChecked>Select Member</option>
                        {members?.map((member, key)=>(
                            <option value={JSON.stringify(member)} key={key}>{`
                                ${member?.info?.firstName}
                                ${member?.info?.lastName}
                            `}</option>
                        ))}
                    </select>
                </div>
                <div className="relative max-width">
                    <textarea className="input centered" style={{width:"250px"}} />
                </div>
                <div className="pad" style={{textAlign:"right"}}>
                    <button onClick={onAsign} className="btn">ASIGN</button>
                </div>
            </div>
        </SpanWrapper>
    )
}