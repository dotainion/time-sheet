import React, { useRef, useState, useEffect } from 'react';
import { InputEntry } from '../../components/widgets/InputEntry';
import { useAuth } from '../../state/auth/Authentication';
import { useStore } from '../../state/stateManagement/stateManagement';
import { tools } from '../../utils/tools/Tools';
import { IconButton } from '../../components/widgets/IconButon';
import { UserNavBar } from '../../container/UserNavBar';


export const ChangeEmail = () =>{
    const { user, changeEmail, changeUserEmail } = useAuth();
    const { setLoader} = useStore()

    const [currentEmailError, setCurrentEmailError] = useState("");
    const [newEmailError, setNewEmailError] = useState("");
    const [confirmEmailError, setConfirmEmailError] = useState("");

    const currentEmailRef = useRef();
    const newEmailRef = useRef();
    const confirmEmailRef = useRef();

    const onUpdate = async() =>{
        let STATE = true;
        if (!currentEmailRef.current.value){
            STATE = false;
            setCurrentEmailError("Invalid Input");
        }
        if (currentEmailRef.current.value !== user?.email){
            STATE = false;
            setCurrentEmailError("Incorrect email address");
        }
        if (!newEmailRef.current.value){
            STATE = false;
            setNewEmailError("Invalid Input");
        }else if(!tools.isEmailValid(newEmailRef.current.value)){
            STATE = false;
            setNewEmailError("Invalid Email Address");
        }
        if (!confirmEmailRef.current.value){
            STATE = false;
            setConfirmEmailError("Invalid Input");
        }else if(newEmailRef.current.value !== confirmEmailRef.current.value){
            STATE = false;
            setConfirmEmailError("Email mismatch");
        }
        if (!STATE) return  

        setLoader(true);
        await changeEmail(newEmailRef.current.value);
        setLoader(false);
    }

    return(
        <UserNavBar>
            <div className="centered" style={{marginLeft:"45%",paddingTop:"100px"}}>
                <div className="header" style={{marginBottom:"60px"}}>Update email address</div>
                <div className="h-seperator" style={{borderColor:"rgb(0,0,0,0)"}}>
                    <InputEntry inputRef={currentEmailRef} error={currentEmailError} errorReset={()=>setCurrentEmailError("")} labelFixed email type="email" label="Current Email" />
                </div>
                <div className="h-seperator" style={{borderColor:"rgb(0,0,0,0)"}}>
                    <InputEntry inputRef={newEmailRef} error={newEmailError} errorReset={()=>setNewEmailError("")} labelFixed email type="email" label="New Email" />
                </div>
                <div className="h-seperator" style={{borderColor:"rgb(0,0,0,0)"}}>
                    <InputEntry inputRef={confirmEmailRef} error={confirmEmailError} errorReset={()=>setConfirmEmailError("")} labelFixed email type="email" label="Confirm Email" />
                </div>
                <div style={{marginTop:"40px"}}>
                <IconButton onClick={onUpdate} cssClass="pad-mini" icon="send" label="Update" />
                </div>
            </div>
        </UserNavBar>
    )
}