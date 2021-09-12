import React, { useEffect, useRef, useState } from 'react';
import { UserNavBar } from '../../container/UserNavBar';
import { getNotification } from '../../database/notifications/NotificationsDb';
import { useAuth } from '../../state/auth/Authentication';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { NotificationBox } from '../../components/widgets/NotificationBox';
import { GiTriquetra } from 'react-icons/gi';
import { NoRecord } from '../../components/widgets/NoRecord';


export const Notifications = () =>{
    const { user } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [showMessageBox, setShowMessageBox] = useState({state:false, data: null});

    const initNotifications = async() =>{
        setNotifications(await getNotification(user?.id));
    }

    useEffect(()=>{
        initNotifications();
    }, []);
    return(
        <UserNavBar>
            <div className="max-size">
                <div style={{height:"90vh",overflowY:"auto"}}>
                    {
                        notifications.length?
                        notifications.map((notice, key)=>(
                            <div className="notification-item-container" key={key}>
                                <div onClick={()=>setShowMessageBox({state:true, data: notice})} className="notification-item">
                                    <div onClick={e=>e.stopPropagation()} className="notification-item-count">
                                        <div className="float-center">{key+1}</div>
                                    </div>
                                    <div className="float-center">
                                        <div className="relative" style={{color:"var(--primary-color)"}}><b>{notice?.info?.header}</b></div>
                                        <div>{notice?.info?.from}</div>
                                    </div>
                                </div>
                            </div>
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
                isOpen={showMessageBox.state}
                onClose={()=>setShowMessageBox({state:false, data: null})}
                data={showMessageBox.data}
            />
        </UserNavBar>
    )
}