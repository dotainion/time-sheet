import React, { useEffect, useState } from 'react';
import { BiSelectMultiple } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';


export const InputSelect = ({onChange, style, optionStyle, label, Icon, noBottomBorder, border, borderColor, inputRef, options, defaultOption, disabled, hidden, error, errorReset}) =>{
    const [toggleIcon, setToggleIcon] = useState(false);
    const [grayColor, setGrayColor] = useState(false);

    const triggerOnChange = () =>{
        errorReset?.("");
        if (inputRef?.current?.value === defaultOption){
            setToggleIcon(false);
            setGrayColor(true);
        }else{
            setToggleIcon(true);
            setGrayColor(false);
        }
        onChange?.();
    }

    useEffect(()=>{
        setToggleIcon(true);
        setGrayColor(false);
    }, [inputRef?.current]);
    return(
        <div 
            hidden={hidden}
            className="relative"
            style={!style? {
                marginTop:"20px",
                marginBottom:"20px",
            }: style}
        >
            <div
                className="float-left" 
                style={{
                    top:"-13px",
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
                    Icon? <Icon
                        className="float-left pad" 
                        style={{
                            color:error?"red":"gray",
                            display:toggleIcon && "none"
                        }} 
                    />:
                    <BiSelectMultiple
                        className="float-left pad" 
                        style={{
                            color:error?"red":"gray",
                            display:toggleIcon && "none"
                        }} 
                    />
                }
                <TiTick
                    className="float-left pad" 
                    style={{
                        color:"green",
                        fontSize:"20px",
                        display:!toggleIcon && "none"
                    }} 
                />
            </div>
            <select 
                disabled={disabled} 
                ref={inputRef} 
                onChange={triggerOnChange}
                onKeyUp={onChange}
                style={{
                    backgroundColor:disabled && "rgb(192, 217, 245)",
                    color:disabled && "gray" || grayColor && "gray",
                    border:error && "1px solid red",
                    cursor:"pointer",
                    ...optionStyle
                }} 
                className={`input-entery`}
            >
                <option hidden defaultChecked>{defaultOption}</option>
                {options?.map?.((role, key)=>(
                    <option style={{color:"black"}} key={key}>{role}</option>
                ))}
            </select>
            <div
                className="float-left input-entery max-width"
                style={{
                    display: noBottomBorder && "none",
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