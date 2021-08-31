import React from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


export const NotificationLogs = ({header, from, info, message, onShowMore, moreId, onShowLess, lessId}) =>{
    return(
        <div className="user-notification-container">
            <div><b>{header}</b></div>
            <div>{from}</div>
            <span 
                onClick={onShowMore}
                id={moreId}
            >More...<FaAngleDown/></span>
            <div hidden id={lessId}>
                <div>{info}</div>
                <p>{message}</p>
                <span 
                    onClick={onShowLess}
                >Close...<FaAngleUp/></span>
            </div>
        </div>
    )
}