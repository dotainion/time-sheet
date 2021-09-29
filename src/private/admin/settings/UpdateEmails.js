import React, { useRef, useState, useEffect } from 'react';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { useAuth } from '../../../state/auth/Authentication';
import { tools } from '../../../utils/tools/Tools';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';
import { IconButton } from '../../../components/widgets/IconButon';


export const UpdateEmails = () =>{
    const { user, changeEmail, changeUserEmail } = useAuth();

    const [userSelected, setUserSelected] = useState({});
    const [error, setError] = useState("");
    const [currentEmailError, setCurrentEmailError] = useState("");
    const [newEmailError, setNewEmailError] = useState("");
    const [confirmEmailError, setConfirmEmailError] = useState("");
    const [updateToggle, setUpdateToggle] = useState(false);

    const currentEmailRef = useRef();
    const newEmailRef = useRef();
    const confirmEmailRef = useRef();

    const onUserSelected = (uUser) =>{
        setUserSelected(uUser);
        currentEmailRef.current.value = uUser?.info?.email;
    }

    const onUpdate = async() =>{
        let STATE = true;
        setError("");
        if (!Object.keys(userSelected || {}).length){
            return setError("No user was selected.");
        }
        if (!currentEmailRef.current.value){
            STATE = false;
            setCurrentEmailError("Invalid Input");
        }else if(userSelected?.info?.email !== currentEmailRef.current.value){
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
        if (!updateToggle){
            await changeUserEmail(userSelected?.info?.email, newEmailRef.current.value, userSelected?.id);
        }else{
            await changeEmail(newEmailRef.current.value);
        }
    }

    useEffect(()=>{
        if (updateToggle){
            currentEmailRef.current.value = user?.email;
            setUserSelected({info:user});
        }else{
            currentEmailRef.current.value = "";
            setUserSelected(null);
        }
    }, [updateToggle]);

    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer showCurrentUser={updateToggle} onSelected={onUserSelected} updateUserEmail noMultiSelect >
                <div className="pad">
                    <IconButton onClick={()=>setUpdateToggle(!updateToggle)} label="My Email" icon="email" />
                </div>
                <div className="centered" style={{marginLeft:"45%"}}>
                    <div className="header" style={{marginBottom:"60px"}}>Update a user email address</div>
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