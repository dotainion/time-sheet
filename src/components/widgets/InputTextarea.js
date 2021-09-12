import React, { useEffect, useState } from 'react';



export const InputTextarea = ({id, inputRef, inputStyle, label, resize, placeholder, labelFixed, type, disabled, hidden, border, borderColor, error, errorReset, titleCase}) =>{
    const [labelStyle, setLabelStyle] = useState({color:"gray",left:"40px"});

    const onFloatLabel = () =>{
        if (!labelFixed){
            setLabelStyle({top:"-13px"});
        }
        inputRef?.current?.focus();
    }

    const onCenterLabel = () =>{
        if (!inputRef?.current?.value){
            if (!labelFixed){
                setLabelStyle({color:"gray",left:"40px"});
            }
        }
    }

    useEffect(()=>{
        if (!labelFixed) onFloatLabel();
        else setLabelStyle({top:"-13px"});
    }, [inputRef?.current]);
    return(
        <div 
            hidden={hidden}
            className="relative"
            style={{
                marginTop:"20px",
                marginBottom:"20px",
            }}
        >
            <div
                onClick={onFloatLabel} 
                className="float-left" 
                style={{
                    ...labelStyle,
                    cursor:"text",
                }}
            >{label}</div>
            <textarea
                disabled={disabled}
                ref={inputRef}
                onFocus={onFloatLabel}
                onBlur={onCenterLabel}
                onChange={()=>errorReset?.("")}
                placeholder={labelFixed?placeholder || label:null}
                className={`input-textarea input-entery ${titleCase && "title-case"}`}
                style={{border:error && "1px solid red", resize:!resize && "none",...inputStyle}}
                type={type}
                id={id}
            />
            <div
                className="float-left input-entery max-width"
                style={{
                    transform:"translateY(120%)",
                    border:"none",
                    borderRadius:"0",
                    borderBottom: border?"1px solid skyblue":"none",
                    borderColor:borderColor
                }}
            />
            <div
                className="float-bottom-overflow"
                style={{
                    left:"0",
                    color: "orangered",
                    fontSize:"14px",
                    transform:"translate3d(0, 80%, 0)"
                }}
            >{error}</div>
        </div>
    )
}