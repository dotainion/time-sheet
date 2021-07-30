import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/Authentication';
import { adminRoutes, routes } from '../routes/Routes';


export const SignIn = () =>{
    const history = useHistory();
    const { user, signIn, isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const login = async() =>{
        setLoading(true);
        setMessage("");
        const res = await signIn(emailRef.current.value, passwordRef.current.value);
        if (res?.error) setMessage(res?.error);
        setLoading(false);
    }

    useEffect(()=>{
        if (isAuthenticated){
            if (user?.role === "Administrator"){
                history.push(adminRoutes.welcome)
            }else{
                history.push(routes.welcome);
            }
        }
    }, [user]);
    return(
        <div className="single-page">
            <div className="float-top-center" style={{color:"red",top:"10%"}}>
                <p>{message}</p>
            </div>
            <div className="float-center signin-container text-normal">
                <input ref={emailRef} className="input centered" style={{width:"250px"}} type="email" placeholder="Email" />
                <input ref={passwordRef} className="input centered" style={{width:"250px"}} type="password" placeholder="Password" />
                <div style={{paddingLeft:"18px",paddingRight:"18px",textAlign:"right",marginTop:"20px"}}>
                    <button onClick={login} disabled={loading} className="btn btn-hover">Sign in</button>
                </div>
            </div>
        </div>
    )
}