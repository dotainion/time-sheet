import React from 'react';
import { ImDatabase, ImNotification } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { IoTimeSharp } from 'react-icons/io5'


export const NoRecord = ({icon="database", header, message, subMessage}) =>{
    return(
        <div className="float-center no-record-container">
            <div style={{fontSize:"17px"}}>
                <div className="inline-block relative" style={{marginRight:"10px"}}>
                    {icon === "database" && <>
                        <ImDatabase style={{fontSize:"25px"}} />
                        <IoMdClose className="float-center" style={{color:"red", fontSize:"25px"}}/></>
                    }
                    {icon === "users" && <FaUsers style={{fontSize:"25px"}} />}
                    {icon === "message" && <BsFillChatDotsFill style={{fontSize:"25px"}} />}
                    {icon === "notification" && <ImNotification style={{fontSize:"25px"}} />}
                    {icon === "logs" && <IoTimeSharp style={{fontSize:"25px"}} />}
                </div>
                <b>{header || "No record"}</b>
            </div>
            <div>{message}</div>
            <div>{subMessage}</div>
        </div>
    )
}