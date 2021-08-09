import React, { useEffect, useState } from 'react';


export const InputEntry = ({label, inputRef, disabled, hidden, error, errorReset}) =>{
    const [labelStyle, setLabelStyle] = useState({color:"black",left:"5px"});

    const onFloatLabel = () =>{
        setLabelStyle({top:"-9px"});
        inputRef?.current?.focus();
    }

    const onCenterLabel = () =>{
        if (!inputRef?.current?.value){
            setLabelStyle({color:"black",left:"5px"});
        }
    }

    useEffect(()=>{
        onFloatLabel();
    }, [inputRef?.current]);
    return(
        <div 
            hidden={hidden}
            className="relative half-width max-width-on-mobile"
            style={{
                marginTop:"20px",
                marginBottom:"20px",
            }}
        >
            <div
                onClick={onFloatLabel} 
                className="float-left" 
                style={labelStyle}
            >{label}</div>
            <input
                disabled={disabled}
                ref={inputRef}
                onFocus={onFloatLabel}
                onBlur={onCenterLabel}
                onChange={()=>errorReset?.("")}
                className="input-entery max-width"
                style={{border:error && "1px solid red"}}
            />
            <div
                className="float-bottom-overflow"
                style={{
                    left:"0",
                    color: "orangered",
                    fontSize:"12px",
                    transform:"translate3d(0, 80%, 0)"
                }}
            >{error}</div>
        </div>
    )
}