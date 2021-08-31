import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { ADMIN_SUPERVISER } from '../../contents/AuthValue';
import { tools } from '../../utils/tools/Tools';
import { useAuth } from '../../state/auth/Authentication';


export const NotificationLogs = ({onAdd, header, from, info, adminMessage, userMessage, onShowMore, moreId, onShowLess, lessId}) =>{
    const { user } = useAuth();

    const [message, setMessage] = useState([]);

    const isAdmin = () =>{
        return ADMIN_SUPERVISER.includes(user?.role);
    }

    useEffect(()=>{
        let msgArray = [];
        for (let aMsg of adminMessage) msgArray.push({...aMsg, admin: isAdmin()? true: false});
        for (let uMsg of userMessage) msgArray.push({...uMsg, admin: !isAdmin()? true: false});
        setMessage(tools.time.sort(msgArray) || []);
    }, [adminMessage, userMessage]);

    return(
        <div className="user-notification-container">
            <div className="relative">
                <b>{header}</b>
                <MdAdd
                    className="float-right"
                    style={{
                        cursor:"pointer",
                        fontSize:"20px"
                    }}
                    onClick={onAdd}
                />
            </div>
            <div>{from}</div>
            <span 
                onClick={onShowMore}
                id={moreId}
            >More...<FaAngleDown/></span>
            <div hidden id={lessId}>
                <div>{info}</div>
                <div>
                    {message?.map((obj, key)=>(
                        <div
                            className={
                                !obj?.admin? 
                                "user-notification-msg-admin":
                                "user-notification-msg-user"
                            }
                            key={key}
                        >{obj?.msg}</div>
                    ))}
                </div>
                <span 
                    onClick={onShowLess}
                >Close...<FaAngleUp/></span>
            </div>
        </div>
    )
}