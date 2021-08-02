import React, { useEffect, useRef, useState } from 'react';
import { UnAuthHeader } from '../../../components/layouts/UnAuthHeader';
import { SideInfo } from '.././widgets/SideInfo';
import { SubHeaderInfo } from '.././widgets/SubHeaderInfo';
import { useAuth } from '../../../state/auth/Authentication';
import { useError } from '../../../state/errors/Error';
import { ADMINISTRATOR, ADMIN_SUPERVISER } from '../../../contents/AuthValue';
import { useHistory } from 'react-router-dom';
import { adminRoutes, routes } from '../../../utils/routes/Routes';

export const Register = () =>{
    const history = useHistory();

    const { user, isAuthenticated, createUser } = useAuth();
    const { checkObject, processPayload, setPayload } = useError();

    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const res = await createUser(object);
            if (res?.error)  setPayload(res?.error);
        }catch{

        }finally{
            setLoading(false);
            processPayload();
        }
    }

    useEffect(()=>{
        if (isAuthenticated){
            if (ADMIN_SUPERVISER.includes(user?.role)) history.push(adminRoutes.welcome);
            else  history.push(routes.welcome);
        }
    }, [user]);

    return(
        <div className="single-page">
            <UnAuthHeader useLogin usePricing />

            <SubHeaderInfo/>

            <div className="flex">
                <SideInfo/>
                <div className="relative max-width">
                    <div className="float-top-center creds-container">
                        <div className="pad">Sign Up</div>
                        <input ref={firstNameRef} className="input input-hover block pad" placeholder="Your first name" type="text" />
                        <input ref={lastNameRef} className="input input-hover block pad" placeholder="Your last name" type="text" />
                        <input ref={emailRef} className="input input-hover block pad" placeholder="Your email" type="email" />
                        <input ref={passwordRef} className="input input-hover block pad" placeholder="Your password" type="password" />
                        <button onClick={onRegister} disabled={loading} className="btn btn-hover creds-btn">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}