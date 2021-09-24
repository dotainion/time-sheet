import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/Authentication';
import { ADMIN_SUPERVISER } from '../../contents/AuthValue';
import { adminRoutes, routes } from '../../utils/routes/Routes';
import { tools } from '../../utils/tools/Tools';
import { LoadingBar } from '../../components/widgets/LoadingBar';
import { getSettings } from '../../database/settings/Settings';
import { getNotification } from '../../database/notifications/NotificationsDb';

const Management = createContext();
export const useStore = () => useContext(Management);

const initTime = tools.time.digits(new Date().toLocaleDateString());
export const StateMangement = ({children}) =>{
    const history = useHistory();
    
    const { user, isAuthenticated } = useAuth();

    const [loading, setLoader] = useState(false);
    const [dateObject, setDateObject] = useState({from: initTime, to: initTime});
    const [settings, setSettings] = useState({});
    const [notifications, setNotifications]= useState([]);

    const onContinue = () =>{
        if (isAuthenticated){
            if (ADMIN_SUPERVISER.includes(user?.role)) history.push(adminRoutes.addUser);
            else history.push(routes.clocked);
        }
    }

    const initStore = async() =>{
        setSettings(await getSettings(user?.id));
        const notific = await getNotification(user?.id);
        //init notification for notification icon on tool bar
        let notificTemp = [];
        notific.forEach((notice)=>{
            if (!notice?.info?.seen){
                notificTemp.push(notice);
            }
        });
        setNotifications(notificTemp);
    }

    useEffect(()=>{
        initStore();
    },[user]);
    
    const providerValue = {
        dateObject,
        setDateObject,
        settings,
        onContinue,
        setLoader,
        loading,
        notifications
    }
    return(
        <Management.Provider value={providerValue}>
            <LoadingBar isOpen={loading} />
            {children}
        </Management.Provider>
    )
}