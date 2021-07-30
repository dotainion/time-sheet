import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/Authentication';
import { adminRoutes, routes } from '../routes/Routes';
import { tools } from '../tools/Tools';

const Management = createContext();
export const useStore = () => useContext(Management);

const initTime = tools.time.digits(new Date().toLocaleDateString());
export const StateMangement = ({children}) =>{
    const history = useHistory();
    
    const { user, isAuthenticated } = useAuth();

    const [dateObject, setDateObject] = useState({from: initTime, to: initTime});
    const [settings, setSettings] = useState({
        durationDefault: 4
    });

    const onContinue = () =>{
        if (isAuthenticated){
            if (user?.role === "Administrator") history.push(adminRoutes.addUser);
            else history.push(routes.clocked);
        }
    }
    
    const providerValue = {
        dateObject,
        setDateObject,
        settings,
        onContinue
    }
    return(
        <Management.Provider value={providerValue}>
            {children}
        </Management.Provider>
    )
}