import React, { useEffect, useState } from 'react';
import { UserNavBar } from '../../container/UserNavBar';
import { getNotification } from '../../database/notifications/NotificationsDb';
import { useAuth } from '../../state/auth/Authentication';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


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
        //initNotifications();
    }, []);
    return(
        <UserNavBar>
            <div className="max-size" style={{backgroundColor:"rgb(243, 243, 243)",height:"94vh"}}>
                <div className="centered scrollbar" style={{height:"92vh"}}>
                    {
                        notifications.length?
                        notifications.map((notice, key)=>(
                            <div className="user-notification-container" key={key}>
                                <div><b>{notice?.info?.header}</b></div>
                                <div>{notice?.info?.from}</div>
                                <span 
                                    onClick={()=>toggleMore(`user-notif${key}`,false)}
                                    id={`user-notif${key}btn`}
                                >More...<FaAngleDown/></span>
                                <div hidden id={`user-notif${key}`}>
                                    <div>{notice?.info?.info}</div>
                                    <div>{notice?.info?.message}</div>
                                    <span 
                                        onClick={()=>toggleMore(`user-notif${key}`,true)}
                                    >Close...<FaAngleUp/></span>
                                </div>
                            </div>
                        )):
                        <div className="user-notification-container" style={{marginTop:"40px"}}>No Notifications</div>
                    }
                </div>
            </div>
        </UserNavBar>
    )
}