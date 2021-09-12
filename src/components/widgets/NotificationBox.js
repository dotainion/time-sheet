import React, { useEffect, useRef } from 'react';
import { Backdrop } from '../../container/Backdrop';
import { SpanWrapper } from '../../container/SpanWrapper';
import { updateNotification } from '../../database/notifications/NotificationsDb';
import { tools } from '../../utils/tools/Tools';


export const NotificationBox = ({isOpen, onClose, data}) =>{

    const noticeRef = useRef();

    return(
        <Backdrop isOpen={isOpen} onClose={onClose}>
            <SpanWrapper isOpen>
                <div 
                    style={{
                        width:"330px",
                        padding:"20px",
                        borderRadius:"5px", 
                        backgroundColor:"white",
                        boxShadow:"2px 2px 5px var(--box-shadow-dark-fade)"
                    }}
                    onClick={e=>e.stopPropagation()}
                >
                    <div style={{color:"var(--primary-color)",marginBottom:"10px"}}><b>{data?.info?.header}</b></div>
                    <div>{data?.info?.from}</div>
                    <div>{data?.info?.info}</div>
                    {
                        data?.info?.message && <div
                            className="pad" 
                            style={{
                                backgroundColor:"rgb(235, 233, 233)",
                                marginTop:"10px"
                            }}
                        >{data?.info?.message}</div>
                    }
                </div>
            </SpanWrapper>
        </Backdrop>
    )
}