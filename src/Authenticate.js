import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Page404 } from './404Error/404Errror';
import { NotAutherize } from './404Error/NotAutherize';
import { useAuth } from './auth/Authentication';
import { adminRoutes, routes } from './routes/Routes';
import { Welcome } from './welcome/Welcome';


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
    }

    const userHandler = () =>{
        if (pathIsWelcome()) return <Welcome/>;
        if (Object.values(adminRoutes).includes(history.location.pathname)){
            return <NotAutherize/>;
        }
        return <Component/>;
    }

    if (isAuthenticated){
        if (user?.role === "Administrator"){
            return adminHandler();
        }
        return userHandler();
    }
    return <Redirect to={routes.signIn}/>;
}