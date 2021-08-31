import React, { useEffect, useRef } from 'react';
import { updateNotification } from '../../database/notifications/NotificationsDb';
import { tools } from '../../utils/tools/Tools';
import { MessageBox } from './MessageBox';


export const NotificationBox = ({isOpen, onClose, notifySelected, useAdmin}) =>{

    const noticeRef = useRef();

    const onAddMessage = async(msgObj) =>{
        let adminMessage = noticeRef.current?.info?.adminMessage || [];
        adminMessage?.push?.({
            msg: msgObj?.message,
            date: tools.time.digits()
        });
        const forAdmin = {
            adminSeen: false,
            userMessage: adminMessage
        };
        const forUser = {
            userSeen: false,
            adminMessage: adminMessage
        };
        const object = useAdmin? forAdmin: forUser;
        await updateNotification(object, noticeRef.current?.id);
    }

    useEffect(()=>{
        noticeRef.current = notifySelected;
    }, [notifySelected]);
    return(
        <MessageBox
            isOpen={isOpen}
            onClose={onClose}
            onSendMessage={onAddMessage}
        />
    )
}