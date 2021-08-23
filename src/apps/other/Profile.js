import React, { useState } from 'react';
import defaultImg from '../../images/default-profile-image.png';
import { FaChevronDown } from 'react-icons/fa';
import { ImSpinner3 } from 'react-icons/im';
import { IoMdArrowRoundBack } from 'react-icons/io';


export const Profile = ({img, msg, firstName, lastName, style, pointer, onClick, onBack, loader, loaderId}) =>{
    const [showDownIcon, setShowDownIcon] = useState(false);

    return(
        <div
            className="flex no-select msg-profile" 
            style={{
                ...style,
                cursor:pointer? "pointer": "default",
            }}
            onClick={onClick}
            onMouseEnter={()=>setShowDownIcon(true)}
            onMouseLeave={()=>setShowDownIcon(false)}
            >
            <div style={{width:"60px",height:"60px"}}>
                <img src={img || defaultImg} style={{width:"100%",borderRadius:"50%"}} alt="" />
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
                className="float-right"
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
        </div>
    )
}