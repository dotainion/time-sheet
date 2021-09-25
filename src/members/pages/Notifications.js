import React, { useEffect, useRef, useState } from 'react';
import { UserNavBar } from '../../container/UserNavBar';
import { getNotification, updateNotification } from '../../database/notifications/NotificationsDb';
import { useAuth } from '../../state/auth/Authentication';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { NotificationBox } from '../../components/widgets/NotificationBox';
import { GiTriquetra } from 'react-icons/gi';
import { NoRecord } from '../../components/widgets/NoRecord';
import { useStore } from '../../state/stateManagement/stateManagement';


export const Notifications = () =>{
    const { user } = useAuth();
    const { notificationList, removeANotifications } = useStore();

    const [showMessageBox, setShowMessageBox] = useState({state:false, data: null});

    const onView = (data) =>{
        setShowMessageBox({state:true, data});
        if (!data?.info?.seen) updateSeen(data?.id);
    }

    const updateSeen = async(id) =>{
        await updateNotification({seen:true}, id);
        removeANotifications(id);
    }
    
    return(
        <UserNavBar>
            <div className="max-size">
                <div style={{height:"90vh",overflowY:"auto"}}>
                    {
                        notificationList.length?
                        notificationList.map((notice, key)=>(
                            <div className="notification-item-container" key={key}>
                                <div onClick={()=>onView(notice)} className="notification-item">
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