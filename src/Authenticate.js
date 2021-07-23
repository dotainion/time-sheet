import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth } from './auth/Authentication';
import { routes } from './routes/Routes';


export const Authenticate = ({Component}) =>{
    const history = useHistory();

    const { user, isAuthenticated } = useAuth();

    if (isAuthenticated){
        if (user?.role === "Administrator"){
            if (history.location.pathname === routes.admin){
                return <Component/>;
            }
            return <Redirect to={routes.admin}/>;
        }
        return <Component/>;
    }
    return <Redirect to={routes.signIn}/>;
}