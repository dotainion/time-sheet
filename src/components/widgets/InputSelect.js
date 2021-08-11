import React, { useEffect, useState } from 'react';
import { AiOutlineSelect } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';


export const InputSelect = ({label, inputRef, options, defaultOption, disabled, hidden, error, errorReset}) =>{
    const [toggleIcon, setToggleIcon] = useState(false);

    const onChange = () =>{
        errorReset("");
        if (inputRef?.current?.value === defaultOption){
            setToggleIcon(false);
        }else{
            setToggleIcon(true);
        }
    }

    useEffect(()=>{
        onChange();
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
                className="float-left" 
                style={{top:"-9px"}}
            >{label}</div>
            <div 
                className="float-left"
                style={{
                    width:"35px",
                    height:"100%",
                    borderRight:"1px solid gray"
                }}>
                <AiOutlineSelect
                    className="float-left pad" 
                    style={{color:"black",display:toggleIcon && "none"}} 
                />
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
                onChange={onChange}
                style={{
                    backgroundColor:disabled && "rgb(192, 217, 245)",
                    color:disabled && "gray",
                    border:error && "1px solid red",
                }} 
                className={`input-entery`}
            >
                <option hidden defaultChecked>{defaultOption}</option>
                {options?.map?.((role, key)=>(
                    <option key={key}>{role}</option>
                ))}
            </select>
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