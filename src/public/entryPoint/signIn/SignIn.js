import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../state/auth/Authentication';
import { adminRoutes, routes } from '../../../utils/routes/Routes';
import { useError } from '../../../state/errors/Error';
import { ADMIN_SUPERVISER } from '../../../contents/AuthValue';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { FcCalendar } from 'react-icons/fc';
import { FaUsers } from 'react-icons/fa';
import { LoginSignInContainer } from '../widgets/LoginSignInContainer';


export const SignIn = () =>{
    const history = useHistory();
    
    const { setPayload, processPayload, clearPayload } = useError();
    const { user, signIn, isAuthenticated } = useAuth();
    const { loading, setLoader } = useStore();

    const emailRef = useRef();
    const passwordRef = useRef();

    const login = async() =>{
        try{
            setLoader(true);
            clearPayload();
            const res = await signIn(emailRef.current.value, passwordRef.current.value);
            if (res?.error){
                setPayload(res?.error);
            }
        }catch{

        }finally{
            processPayload();
            setLoader(false);
        }
    }

    useEffect(()=>{
        if (isAuthenticated){
            setLoader(false);
            if (ADMIN_SUPERVISER.includes(user?.role)) history.push(adminRoutes.welcome);
            else history.push(routes.welcome);
        }
    }, [user]); 
    return(
        <LoginSignInContainer loading={loading} onAuthenticate={login} authName="LOGIN">
            <input ref={emailRef} className="input input-hover lower-case block pad" placeholder="Your email" type="email" />
            <input ref={passwordRef} className="input input-hover block pad" placeholder="Your password" type="password" />
        </LoginSignInContainer>
    )
}