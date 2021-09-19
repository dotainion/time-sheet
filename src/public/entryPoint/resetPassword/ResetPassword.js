import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../state/auth/Authentication';
import { useError } from '../../../state/errors/Error';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { SignInRegisterContainer } from '../widgets/SignInRegisterContainer';


export const ResetPassword = () =>{
    const { checkObject, processPayload, setPayload, proccessStatus } = useError();
    const { sendResetPasswordToEmail } = useAuth();
    const { loading, setLoader } = useStore();

    const [authName, setAuthName] = useState("SEND");

    const emailRef = useRef()

    const onReset = async() =>{
        try{
            const object = {
                email: emailRef.current.value
            }
            proccessStatus("");
            const isObject = checkObject(object, "is require.");
            if (!isObject) return processPayload();
            setLoader(true);
            const res = await sendResetPasswordToEmail(emailRef.current.value);
            if (res?.error){
                setPayload(res?.error);
            }else{
                const msg = "A link was send to your email with details to reset your account.";
                proccessStatus(msg);
                setAuthName("RESEND");
            }
        }catch{

        }finally{
            processPayload();
            setLoader(false);
        }
    }

    useEffect(()=>{
        proccessStatus("");
    }, []);

    return(
        <SignInRegisterContainer icon="email" authName={authName} loading={loading} onAuthenticate={onReset}>
            <input ref={emailRef} className="creds-input input-hover block pad" placeholder="Enter your email address" type="email" />
        </SignInRegisterContainer>
    )
}