import React, { useRef, useState } from 'react';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { useAuth } from '../../../state/auth/Authentication';
import { tools } from '../../../utils/tools/Tools';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';


export const UpdateEmail = () =>{
    const { user, changeEmail } = useAuth();

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
        }else if(user?.email !== currentEmailRef.current.value){
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
        await changeEmail(newEmailRef.current.value);
    }

    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer updateEmail>
                <div className="add-update-new-user-info">
                    <div className="header" style={{marginBottom:"50px"}}>Update a my email address</div>
                    <div className="h-seperator" style={{borderColor:"rgb(0,0,0,0)"}}>
                        <InputEntry inputRef={currentEmailRef} error={currentEmailError} errorReset={()=>setCurrentEmailError("")} email label="Current Email" />
                    </div>
                    <div className="h-seperator" style={{borderColor:"rgb(0,0,0,0)"}}>
                        <InputEntry inputRef={newEmailRef} error={newEmailError} errorReset={()=>setNewEmailError("")} email label="New Email" />
                    </div>
                    <div className="h-seperator" style={{borderColor:"rgb(0,0,0,0)"}}>
                        <InputEntry inputRef={confirmEmailRef} error={confirmEmailError} errorReset={()=>setConfirmEmailError("")} email label="Confirm Email" />
                    </div>
                    <div style={{marginTop:"40px"}}>
                    <button onClick={onUpdate} className="btn btn-hover">Update</button>
                    </div>
                </div>
            </AdminSettignsContainer>
        </AdminNavBar>
    )
}