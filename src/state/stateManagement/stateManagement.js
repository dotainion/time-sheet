import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/Authentication';
import { ADMIN_SUPERVISER } from '../../contents/AuthValue';
import { adminRoutes, routes } from '../../utils/routes/Routes';
import { tools } from '../../utils/tools/Tools';
import { LoadingBar } from '../../components/widgets/LoadingBar';

const Management = createContext();
export const useStore = () => useContext(Management);

const initTime = tools.time.digits(new Date().toLocaleDateString());
export const StateMangement = ({children}) =>{
    const history = useHistory();
    
    const { user, isAuthenticated } = useAuth();

    const [loader, setLoader] = useState(false);
    const [dateObject, setDateObject] = useState({from: initTime, to: initTime});
    const [settings, setSettings] = useState({
        durationDefault: 4
    });

    const onContinue = () =>{
        if (isAuthenticated){
            if (ADMIN_SUPERVISER.includes(user?.role)) history.push(adminRoutes.addUser);
            else history.push(routes.clocked);
        }
    }
    
    const providerValue = {
        dateObject,
        setDateObject,
        settings,
        onContinue,
        setLoader
    }
    return(
        <Management.Provider value={providerValue}>
            <LoadingBar isOpen={loader} />
            {children}
        </Management.Provider>
    )
}