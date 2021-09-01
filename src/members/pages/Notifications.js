import React, { useEffect, useRef, useState } from 'react';
import { UserNavBar } from '../../container/UserNavBar';
import { getNotification } from '../../database/notifications/NotificationsDb';
import { useAuth } from '../../state/auth/Authentication';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { NotificationLogs } from '../../components/widgets/NotificationLogs';
import { MessageBox } from '../../components/widgets/MessageBox';
import { NotificationBox } from '../../components/widgets/NotificationBox';
import { GiTriquetra } from 'react-icons/gi';
import { NoRecord } from '../../components/widgets/NoRecord';


export const Notifications = () =>{
    const { user } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [showMessageBox, setShowMessageBox] = useState(false);

    const notificationSelected = useRef();

    const toggleMore = (id, state) =>{
        document.getElementById(id).hidden = state;
        document.getElementById(`${id}btn`).hidden = !state;
    }

    const onShowMessageBox = (notifyObj) =>{
        setShowMessageBox(true);
        notificationSelected.current = notifyObj;
    }

    const initNotifications = async() =>{
        setNotifications(await getNotification(user?.id));
    }

    useEffect(()=>{
        initNotifications();
    }, []);
    return(
        <UserNavBar>
            <div className="max-size" style={{backgroundColor:"rgb(243, 243, 243)",height:"94vh"}}>
                <div className="centered scrollbar" style={{height:"92vh"}}>
                    {
                        notifications.length?
                        notifications.map((notice, key)=>(
                            <NotificationLogs
                                header={notice?.info?.header}
                                from={notice?.info?.from}
                                info={notice?.info?.info}
                                adminMessage={notice?.info?.adminMessage}
                                userMessage={notice?.info?.userMessage}
                                moreId={`user-notif${key}btn`}
                                lessId={`user-notif${key}`}
                                onShowMore={()=>toggleMore(`user-notif${key}`,false)}
                                onShowLess={()=>toggleMore(`user-notif${key}`,true)}
                                onAdd={()=>onShowMessageBox(notice)}
                                key={key}
                            />
                        )):
                        <NoRecord 
                            icon="notification"
                            header="No notification" 
                            message="Notification provides details to spesific information." 
                            subMessage="It cant be for knowledge, errors, clarification or areas that needs updating."
                        />
                    }
                </div>
            </div>
            <NotificationBox
                isOpen={showMessageBox}
                onClose={()=>setShowMessageBox(false)}
                notifySelected={notificationSelected.current}
            />
        </UserNavBar>
    )
}