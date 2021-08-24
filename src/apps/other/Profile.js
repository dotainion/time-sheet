import React, { useRef, useState } from 'react';
import defaultImg from '../../images/default-profile-image.png';
import { FaChevronDown } from 'react-icons/fa';
import { ImSpinner3 } from 'react-icons/im';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdUpdate } from 'react-icons/md';
import { tools } from '../../utils/tools/Tools';


export const Profile = ({img, msg, firstName, lastName, onImgSelected, cssClass, style, pointer, useUpdateImage, onClick, onBack, loader, loaderId}) =>{
    const [showDownIcon, setShowDownIcon] = useState(false);
    const [imageSelected, setImageSelected] = useState("");

    const imgRef = useRef();

    const onUpdateImage = (e) =>{
        e?.stopPropagation?.();
        //info to update image
    }

    const onImageSelected = async() =>{
        const nImg = await tools.toBase64(imgRef.current?.files?.[0]);
        setImageSelected(nImg);
        onImgSelected?.(nImg);
    }

    const onTriggerClick = () =>{
        if (useUpdateImage){
            imgRef.current?.click?.();
        }
        onClick?.();
    }

    return(
        <div
            className={`flex no-select msg-profile ${cssClass}`} 
            style={{
                ...style,
                cursor:pointer? "pointer": "default",
            }}
            onClick={onTriggerClick}
            onMouseEnter={()=>setShowDownIcon(true)}
            onMouseLeave={()=>setShowDownIcon(false)}
            >
            <div style={{width:"60px",height:"60px"}}>
                <img
                    src={imageSelected || img || defaultImg}
                    style={{
                        width:"100%",
                        height:"100%",
                        borderRadius:"50%"
                    }}
                    alt=""
                />
            </div>
            <div className="relative" style={{width:"100%"}}>
                <div className="float-left" style={{paddingLeft:"5px"}}>
                    <div style={{fontSize:"15px"}}><b>{firstName} {lastName}</b></div>
                    <div style={{fontSize:"12px"}}>{msg || "No message"}</div>
                </div>
            </div>
            <div
                className="float-right"
                style={{
                    right:"5px",
                    display:!pointer && "none"
                }}
                >
                <FaChevronDown 
                    style={{
                        display:!showDownIcon  && "none"
                    }}
                />
            </div>
            <div
                className="float-right"
                style={{
                    display:!loader && "none",
                    borderRadius:"50%",
                    right:"25px"
                }}
                id={loaderId}
                >
                <ImSpinner3 className="spin" />
            </div>
            <div
                className="float-right hide-on-desktop"
                style={{
                    right:"20px"
                }}
                >
                <IoMdArrowRoundBack
                    style={{
                        fontSize:"20px",
                        display: !onBack && "none"
                    }}
                    onClick={onBack}
                />
            </div>
            <input hidden ref={imgRef} onChange={onImageSelected} type="file" />
        </div>
    )
}