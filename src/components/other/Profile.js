import React, { useState, useRef } from "react";
import defaultImage from '../../images/default-image.jpg';
import { WidgetsInfo } from '../../components/widgets/WidgetsInfo';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { tools } from "../../utils/tools/Tools";


export const Profile = ({onClick, onBack, useSelectImage, firstName, cssClass, lastName, role, image, info, floatLeft, primaryColor, style}) =>{
    const [imageSelected, setImageSelected] = useState("");
    
    const imgRef = useRef();

    const onImageSelected = async() =>{
        const nImg = await tools.toBase64(imgRef.current?.files?.[0]);
        setImageSelected(nImg);
        onClick?.(nImg);
    }

    const onTriggerClick = () =>{
        if (useSelectImage){
            imgRef.current?.click?.();
        }
        onClick?.();
    }
    return(
        <WidgetsInfo
            cssClass={`header-profile no-select ${cssClass}`} 
            style={{float:floatLeft && "none",...style}}
            info={info === false?null:info || "Profile"}
            onClick={onTriggerClick}
        >
            <img src={image || imageSelected || defaultImage} alt="" />
            <div className="relative" style={{color:primaryColor && "var(--primary-color)"}}>
                <div className="float-left no-wrap pad">
                    <b>{firstName} {lastName}</b>
                    <div>{role}</div>
                </div>
            </div>
            <div className="float-right hide-on-desktop" style={{fontSize:"20px",right:"-70px"}}>
                <IoMdArrowRoundBack onClick={onBack} style={{display: !onBack && "none"}}/>
            </div>
            <input hidden ref={imgRef} onChange={onImageSelected} type="file" />
        </WidgetsInfo>
    )
}