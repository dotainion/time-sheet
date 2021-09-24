import React, { useEffect, useRef, useState } from 'react';
import { Backdrop } from '../container/Backdrop';
import { SpanWrapper } from '../container/SpanWrapper';
import { CHAGNE_PASSWORD, RESET_USER_PASSWORD } from '../contents/GlobalValues';
import { getUsers } from '../database/accounts/AccountsDb';
import { getCreds } from '../database/credentials/CredentialsDb';
import { useAuth } from '../state/auth/Authentication';
import { useError } from '../state/errors/Error';
import { useStore } from '../state/stateManagement/stateManagement';
import { secure } from './Security';


export const ChangePassword = ({isOpen, onClose}) =>{
    const { user, changePassword } = useAuth();
    const { error, setPayload, processPayload} = useError();

    const [toggleInputs, setToggleInputs] = useState(true);
    const [shake, setShake] = useState("");

    const timeoutRef = useRef();

    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    const onProccessError = () =>{
        processPayload();
        setShake("shack-up");
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setShake("");
        }, 500);
}

    const onCheckCurrentPassword = async() =>{
        let STATE = true;
        if (!emailRef.current.value){
            STATE = false;
            setPayload("Invalid email");
        }
        if (!oldPasswordRef.current.value){
            STATE = false;
            setPayload(" Invalid password");
        }
        if (!STATE) return onProccessError();
        const creds = await getCreds(user?.id);
        if (
                user?.email === emailRef.current.value &&
                secure.decrypt(creds?.password) === oldPasswordRef.current.value
            ){
            emailRef.current.value = "";
            oldPasswordRef.current.value = "";
            return setToggleInputs(false);
        }
        setPayload("Incorrect username or password");
        processPayload();
    }

    const onChangePassword = async() =>{
        let STATE = true;
        if (!newPasswordRef.current.value || !confirmPasswordRef.current.value){
            STATE = false;
            setPayload("Invalid password");
        }else if (newPasswordRef.current.value !== confirmPasswordRef.current.value){
            STATE = false;
            setPayload("Password mismatch");
        }
        if (!STATE) return processPayload();
        await changePassword(newPasswordRef.current.value);
    }

    useEffect(()=>{
        if (isOpen) setToggleInputs(true);
    }, [isOpen]);

    return(
        <Backdrop isOpen={isOpen}>
            <SpanWrapper isOpen onClose={onClose} shadow cssClass={shake}>
                <div className="pad" style={{width:"300px"}}>
                    <div className="pad" style={{color:"orange"}}><b>Change Password</b></div>
                    <div hidden={!toggleInputs} className="pad centered" style={{width:"275px"}}>
                        <div style={{color:"white"}}>Current credentials</div>
                        <input ref={emailRef} className="input input-hover block" placeholder="Email" type="email" style={{width:"260px",marginBottom:"5px"}} />
                        <input ref={oldPasswordRef} className="input input-hover block" placeholder="Enter old password" type="password" style={{width:"260px"}} />
                    </div>
                    <div hidden={toggleInputs} className="pad centered" style={{width:"275px"}}>
                        <div style={{color:"white"}}>New credentials</div>
                        <input ref={newPasswordRef} className="input input-hover block" placeholder="Enter new password" type="password" style={{width:"260px"}} />
                        <input ref={confirmPasswordRef} className="input input-hover block" placeholder="Confirm new password" type="password" style={{width:"260px"}} />
                    </div>
                    <div className="pad" style={{textAlign:"right"}}>
                        <button hidden={!toggleInputs} onClick={onCheckCurrentPassword} className="btn btn-hover">Next</button>
                        <button hidden={toggleInputs} onClick={onChangePassword} className="btn btn-hover">Save</button>
                        <button onClick={onClose} className="btn btn-hover" style={{marginLeft:"10px"}}>Close</button>
                    </div>
                </div>
            </SpanWrapper>
        </Backdrop>
    )
}