import React, { useEffect, useRef, useState } from 'react';
import { UserNavBar } from '../../container/UserNavBar';
import { getNotification } from '../../database/notifications/NotificationsDb';
import { useAuth } from '../../state/auth/Authentication';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { MessageBox } from '../../components/widgets/MessageBox';
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
            <div className="max-size" style={{backgroundColor:"rgb(243, 243, 243)",height:"94vh"}}>
                <div className="centered scrollbar" style={{height:"92vh"}}>
                    {
                        notifications.length?
                        notifications.map((notice, key)=>(
                            <div onClick={()=>setShowMessageBox({state:true, data: notice})} className="user-notification-container" key={key}>
                                <div className="relative"><b>{notice?.info?.header}</b></div>
                                <div>{notice?.info?.from}</div>
                                <div hidden>
                                    <div>{notice?.info?.info}</div>
                                    <div>{notice?.info?.message}</div>
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