import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/Authentication';
import { adminRoutes, routes } from '../../routes/Routes';
import { UnAuthHeader } from '../../layouts/UnAuthHeader';
import { useError } from '../../errors/Error';
import { FcCalendar } from 'react-icons/fc';
import { SubHeaderInfo } from '../widgets/SubHeaderInfo';
import { SideInfo } from '../widgets/SideInfo';
import { ADMIN_SUPERVISER } from '../../contents/AuthValue';
import { useStore } from '../../state/stateManagement';
import { tools } from '../../tools/Tools';


export const SignIn = () =>{
    const history = useHistory();
    
    const { setPayload, processPayload, clearPayload } = useError();
    const { user, signIn, isAuthenticated } = useAuth();
    const { setLoader } = useStore();

    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const login = async() =>{
        setLoader(true);
        setLoading(true);
        clearPayload();
        const res = await signIn(emailRef.current.value, passwordRef.current.value);
        if (res?.error){
            setPayload(res?.error);
            setLoader(false);
        }
        setLoading(false);
        processPayload();
    }

    useEffect(()=>{
        if (isAuthenticated){
            setLoader(false);
            if (ADMIN_SUPERVISER.includes(user?.role)) history.push(adminRoutes.welcome);
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
                        <button onClick={login} disabled={loading} className="btn btn-hover creds-btn">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}