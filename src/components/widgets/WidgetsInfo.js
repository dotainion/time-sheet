import React, { useRef, useState, useEffect } from 'react';


export const WidgetsInfo = ({onClick, cssClass, style, infoStyle, inline, info, error, children}) =>{
    const [showInfo, setShowInfo] = useState(false);
    const [triggerShowInfo, setTriggerShowInfo] = useState(false);

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
        }else{
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(()=>{
                onLeave();
            }, 5000);
        }
    }, [triggerShowInfo]);

    return(
        <div 
            className={`relative ${cssClass} ${inline && "inline"}`} 
            style={{...style, zIndex:"9"}}
            onMouseEnter={()=>setTriggerShowInfo(true)}
            onMouseLeave={onLeave}
            onClick={onClick}
        >
            {children}
            {
                info && <div
                    hidden={!showInfo}
                    className="float-bottom-overflow"
                    style={{
                        color:"white",
                        backgroundColor:"rgb(0,0,0,0.60)",
                        padding:"2px",
                        paddingLeft:"10px",
                        paddingRight:"10px",
                        fontSize:"14px",
                        zIndex:"99999999",
                        borderRadius:"5px",
                        whiteSpace:"normal",
                        minWidth:"150px",
                        transform:inline?"translateY(140%)":"translateY(115%)",
                        boxShadow:"2px 2px 10px var(--shadow-dark)",
                        border:"1px solid gray",
                        overflow:"visible",
                        maxWidth:"300px",
                        textAlign:"left",
                        ...infoStyle
                    }}
                >{info}</div> 
            }
            <div
                className="float-bottom-overflow"
                style={{
                    color:"red",
                    fontSize:"10px",
                    lineHeight:"1",
                    transform:"translateY(120%)"
                }}
            >{error}</div>
        </div>
    )
}