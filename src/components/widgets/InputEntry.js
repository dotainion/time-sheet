import React, { useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import { MdEmail } from 'react-icons/md';


export const InputEntry = ({email, label, inputRef, disabled, hidden, error, errorReset}) =>{
    const [labelStyle, setLabelStyle] = useState({color:"gray",left:"40px"});
    const [toggleIcon, setToggleIcon] = useState(false);

    const onFloatLabel = () =>{
        setLabelStyle({top:"-9px"});
        inputRef?.current?.focus();
    }

    const onCenterLabel = () =>{
        if (!inputRef?.current?.value){
            setToggleIcon(false);
            setLabelStyle({color:"gray",left:"40px"});
        }else{
            setToggleIcon(true);
        }
    }

    useEffect(()=>{
        onFloatLabel();
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
                    cursor:"text"
                }}
            >{label}</div>
            <div 
                className="float-left" 
                style={{
                    width:"35px",
                    height:"100%",
                    borderRight:"1px solid gray"
                }}>
                {
                    email?
                        <MdEmail
                            className="float-left pad" 
                            style={{
                                color:error?"red":"gray",
                                display:error && "block" || toggleIcon && "none"
                            }} 
                        />
                    :<BsPencil 
                        className="float-left pad" 
                        style={{
                            color:error?"red":"gray",
                            display:error && "block" || toggleIcon && "none"
                        }} 
                    />
                }
                <TiTick
                    className="float-left pad" 
                    style={{
                        color:"green",
                        fontSize:"20px",
                        display:!toggleIcon && "none" || error && "none"
                    }} 
                />
            </div>
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
                className="float-left input-entery max-width"
                style={{
                    transform:"translateY(120%)",
                    border:"none",
                    borderRadius:"0",
                    borderBottom:"1px solid skyblue"
                }}
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