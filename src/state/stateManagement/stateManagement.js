import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/Authentication';
import { ADMIN_SUPERVISER } from '../../contents/AuthValue';
import { adminRoutes, routes } from '../../utils/routes/Routes';
import { tools } from '../../utils/tools/Tools';
import { LoadingBar } from '../../components/widgets/LoadingBar';
import { getSettings } from '../../database/settings/Settings';
import { getNotification } from '../../database/notifications/NotificationsDb';
import { time } from '../../utils/time/Time';
import { getRequestChange } from '../../database/requests/TimeChange';
import { getUser } from '../../database/accounts/AccountsDb';
import { RequestsAction } from '../../private/admin/other/RequestsActions';

const Management = createContext();
export const useStore = () => useContext(Management);

const initTime = time.toDigits(new Date().toLocaleDateString());
export const StateMangement = ({children}) =>{
    const history = useHistory();
    
    const { user, isAuthenticated } = useAuth();

    const [loading, setLoader] = useState(false);
    const [dateObject, setDateObject] = useState({from: initTime, to: initTime});
    const [settings, setSettings] = useState({});
    const [notifications, setNotifications]= useState([]);
    const [notificationList, setNotificationList] = useState([]);
    const [requests, setRequests] = useState([]);
    const [showRequests, setShowRequests] = useState(false);

    const onContinue = () =>{
        if (isAuthenticated){
            if (ADMIN_SUPERVISER.includes(user?.role)) history.push(adminRoutes.addUser);
            else history.push(routes.clocked);
        }
    }

    const initNotifications = async() =>{
        const notific = await getNotification(user?.id);
        //holde notification to use in notification pages
        setNotificationList(notific);
        //init notification for notification icon on tool bar
        let notificTemp = [];
        notific.forEach((notice)=>{
            if (!notice?.info?.seen) notificTemp.push(notice);
        });
        setNotifications(notificTemp);
    }

    const removeANotifications = (id) =>{
        let notificTemp = [];
        notifications.forEach((notice)=>{
            if (notice?.id !== id) notificTemp.push(notice);
        });
        setNotifications(notificTemp);
    }

    const initRequests = async() =>{
        let response = await getRequestChange(user?.id);
        let request = [];
        for (let record of response){
            const usr = await getUser(record?.info?.userId);
            record["info"]["user"] = usr;
            request.push(record);
        };
        setRequests(request);
    }

    const initStore = async() =>{
        setSettings(await getSettings(user?.id));
        initNotifications();
    }

    useEffect(()=>{
        initStore();
        initRequests();
    },[user]);
    
    const providerValue = {
        dateObject,
        setDateObject,
        settings,
        onContinue,
        setLoader,
        loading,
        notifications,
        removeANotifications,
        notificationList,
        requests, 
        setRequests,
        setShowRequests
    }
    return(
        <Management.Provider value={providerValue}>
            <LoadingBar isOpen={loading} />
            <RequestsAction 
                isOpen={showRequests} 
                onClose={()=>setShowRequests(false)} 
            />
            {children}
        </Management.Provider>
    )
}