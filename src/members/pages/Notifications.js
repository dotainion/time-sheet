import React, { useEffect, useState } from 'react';
import { UserNavBar } from '../../container/UserNavBar';
import { getNotification } from '../../database/notifications/NotificationsDb';
import { useAuth } from '../../state/auth/Authentication';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { NotificationLogs } from '../../components/widgets/NotificationLogs';


export const Notifications = () =>{
    const { user } = useAuth();

    const [notifications, setNotifications] = useState([]);

    const toggleMore = (id, state) =>{
        document.getElementById(id).hidden = state;
        document.getElementById(`${id}btn`).hidden = !state;
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
                                message={notice?.info?.message}
                                moreId={`user-notif${key}btn`}
                                lessId={`user-notif${key}`}
                                onShowMore={()=>toggleMore(`user-notif${key}`,false)}
                                onShowLess={()=>toggleMore(`user-notif${key}`,true)}
                                key={key}
                            />
                        )):
                        <div className="user-notification-container" style={{marginTop:"40px"}}>No Notifications</div>
                    }
                </div>
            </div>
        </UserNavBar>
    )
}