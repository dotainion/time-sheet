import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../state/auth/Authentication';
import { adminRoutes, routes } from '../../../utils/routes/Routes';
import { UnAuthHeader } from '../../../layouts/UnAuthHeader';
import { useError } from '../../../state/errors/Error';
import { SubHeaderInfo } from '.././widgets/SubHeaderInfo';
import { SideInfo } from '.././widgets/SideInfo';
import { ADMIN_SUPERVISER } from '../../../contents/AuthValue';
import { useStore } from '../../../state/stateManagement/stateManagement';


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

    const onEnterPress = (key) =>{
        if (key === "Enter") login();
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
                    <div onKeyDown={(e)=>onEnterPress(e.key)} className="float-top-center creds-container">
                        <div className="pad"><b>Sign In</b></div>
                        <input ref={emailRef} className="input input-hover lower-case block pad" placeholder="Your email" type="email" />
                        <input ref={passwordRef} className="input input-hover block pad" placeholder="Your password" type="password" />
                        <button onClick={login} disabled={loading} className="btn btn-hover creds-btn">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}