import React, { useRef, useState, useEffect } from 'react';


export const WidgetsInfo = ({onClick, cssClass, style, infoStyle, inline, info, error, children}) =>{
    const [showInfo, setShowInfo] = useState(false);
    const [triggerShowInfo, setTriggerShowInfo] = useState(false);

    const timeoutRef = useRef();

    const onLeave = () =>{
        setShowInfo(false);
        setTriggerShowInfo(false);
    }

    const wordLimit = () =>{
        if (info?.length > 26) return "normal";
        return "nowrap";
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
            style={{...style}}
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
                        padding:"2px",
                        fontSize:"14px",
                        width:wordLimit() === "normal"? "150px": "auto",
                        textAlign:"left",
                        zIndex:"99999999",
                        paddingLeft:"10px",
                        overflow:"visible",
                        borderRadius:"5px",
                        paddingRight:"10px",
                        whiteSpace:wordLimit(),
                        overflow:"auto",
                        border:"1px solid gray",
                        backgroundColor:"rgb(0,0,0,0.60)",
                        boxShadow:"1px 1px 5px rgb(0,0,0)",
                        transform:inline?"translateY(140%)":"translateY(115%)",
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