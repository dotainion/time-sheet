import React, { useEffect, useRef, useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';


export const InfoOnHoverWrapper = ({info, children}) =>{
    const [showInfo, setShowInfo] = useState(false);
    const [triggerShowInfo, setTriggerShowInfo] = useState(false);
    const [animate, setAnimate] = useState(false);

    const timeoutRef = useRef();

    const onLeave = () =>{
        setShowInfo(false);
        setTriggerShowInfo(false);
    }

    useEffect(()=>{
        if (triggerShowInfo){
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(()=>{
                setShowInfo(true);
                setTriggerShowInfo(false);
            }, 800);
        }else clearTimeout(timeoutRef.current);
    }, [triggerShowInfo]);

    return(
        <span
            className="relative"
            style={{marginLeft:"5px",color:"yellow"}} 
            onMouseEnter={()=>setTriggerShowInfo(true)} 
            onMouseLeave={onLeave}
        >
            <span
                style={{color:animate?"orange":"inherit"}}
                onMouseEnter={()=>setAnimate(true)} 
                onMouseLeave={()=>setAnimate(false)}
            >
                {children}
            </span>
            {info && <div 
                    hidden={!showInfo} 
                    className="float-bottom-overflow no-wrap" 
                    style={{
                        fontSize:"12px",
                        cursor:"default",
                        backgroundColor:"white",
                        color:"black",
                        padding:"3px",
                        borderRadius:"3px",
                        maxWidth:"300px",
                        zIndex:"9999999999",
                        transform:"translate3d(-50%, 110%, 0)",
                        border: "1px solid lightgray"
                    }}
                >{info}</div>
            }
        </span>
    )
}