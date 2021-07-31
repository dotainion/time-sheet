import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/Authentication';
import { adminRoutes, routes } from '../../routes/Routes';
import { UnAuthHeader } from '../../layouts/UnAuthHeader';
import { useError } from '../../errors/Error';
import { FcCalendar } from 'react-icons/fc';
import { SubHeaderInfo } from '../widgets/SubHeaderInfo';
import { SideInfo } from '../widgets/SideInfo';
import { ADMINISTRATOR } from '../../contents/AuthValue';

export const SignIn = () =>{
    const history = useHistory();
    
    const { setPayload, processPayload, clearPayload } = useError();
    const { user, signIn, isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const login = async() =>{
        setLoading(true);
        clearPayload();
        const res = await signIn(emailRef.current.value, passwordRef.current.value);
        if (res?.error)  setPayload(res?.error);
        setLoading(false);
        processPayload();
    }

    useEffect(()=>{
        if (isAuthenticated){
            if (user?.role === ADMINISTRATOR) history.push(adminRoutes.welcome);
            else history.push(routes.welcome);
        }
    }, [user]);
    return(
        <div className="single-page">
            <UnAuthHeader useRegister usePricing />

            <SubHeaderInfo/>

            <div className="flex">
                <SideInfo/>
                <div className="relative max-width">
                    <div className="float-top-center creds-container">
                        <div className="pad">Sign In</div>
                        <input ref={emailRef} className="input input-hover block pad" placeholder="Your email" type="email" />
                        <input ref={passwordRef} className="input input-hover block pad" placeholder="Your password" type="password" />
                        <button onClick={login} disabled={loading} className="btn btn-hover creds-btn">login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}