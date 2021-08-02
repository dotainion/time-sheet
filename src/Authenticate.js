import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { NotAutherize } from './public/404Error/NotAutherize';
import { useAuth } from './state/auth/Authentication';
import { ADMIN_SUPERVISER } from './contents/AuthValue';
import { adminRoutes, routes } from './utils/routes/Routes';
import { Welcome } from '././public/welcome/Welcome';


export const Authenticate = ({Component}) =>{
    const history = useHistory();

    const { user, isAuthenticated } = useAuth();

    const pathIsWelcome = () =>{
        if (
            history.location.pathname === routes.welcome ||
            history.location.pathname === routes.default || 
            history.location.pathname === adminRoutes.welcome || 
            history.location.pathname === adminRoutes.default
            ) return true;
        return false;
    }
    const adminHandler = () =>{
        if (pathIsWelcome()) return <Welcome/>;
        if (Object.values(adminRoutes).includes(history.location.pathname)){
            return <Component/>;
        }
        if (Object.values(routes).includes(history.location.pathname)){
            return <NotAutherize/>;
        }
        return <Component/>;
    }

    const userHandler = () =>{
        if (pathIsWelcome()) return <Welcome/>;
        if (Object.values(adminRoutes).includes(history.location.pathname)){
            return <NotAutherize/>;
        }
        return <Component/>;
    }

    if (isAuthenticated){
        if (ADMIN_SUPERVISER.includes(user?.role)){
            return adminHandler();
        }
        return userHandler();
    }
    return <Redirect to={routes.signIn}/>;
}