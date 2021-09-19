import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../state/auth/Authentication';
import { useError } from '../../../state/errors/Error';
import { ADMINISTRATOR, ADMIN_SUPERVISER } from '../../../contents/AuthValue';
import { useHistory } from 'react-router-dom';
import { adminRoutes, routes } from '../../../utils/routes/Routes';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { SignInRegisterContainer } from '../widgets/SignInRegisterContainer';

export const Register = () =>{
    const history = useHistory();

    const { user, isAuthenticated, createUser } = useAuth();
    const { checkObject, processPayload, setPayload } = useError();
    const { loading, setLoader } = useStore();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onRegister = async() =>{
        try{
            const object = {
                email: emailRef.current.value,
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                role: ADMINISTRATOR,
                password: passwordRef.current.value
            }
            const isObject = checkObject(object, "is require.");
            if (!isObject) return processPayload();
            setLoader(true);
            const res = await createUser(object);
            if (res?.error)  setPayload(res?.error);
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
            else  history.push(routes.welcome);
        }
    }, [user]);

    return(
        <SignInRegisterContainer loading={loading} onAuthenticate={onRegister} authName="REGISTER">
            <input ref={firstNameRef} className="creds-input input-hover title-case block pad" placeholder="Your first name" type="text" />
            <input ref={lastNameRef} className="creds-input input-hover title-case block pad" placeholder="Your last name" type="text" />
            <input ref={emailRef} className="creds-input input-hover lower-case block pad" placeholder="Your email" type="email" />
            <input ref={passwordRef} className="creds-input input-hover block pad" placeholder="Your password" type="password" />
        </SignInRegisterContainer>
    )
}