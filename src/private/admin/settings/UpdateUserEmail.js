import React, { useRef, useState } from 'react';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { useAuth } from '../../../state/auth/Authentication';
import { tools } from '../../../utils/tools/Tools';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';
import { UsersLists } from './UsersLists';


export const UpdateUserEmail = () =>{
    const { user, changeUserEmail } = useAuth();

    const [userSelected, setUserSelected] = useState({});
    const [error, setError] = useState("");
    const [currentEmailError, setCurrentEmailError] = useState("");
    const [newEmailError, setNewEmailError] = useState("");
    const [confirmEmailError, setConfirmEmailError] = useState("");

    const currentEmailRef = useRef();
    const newEmailRef = useRef();
    const confirmEmailRef = useRef();

    const onUpdate = async() =>{
        let STATE = true;
        setError("");
        if (!Object.keys(userSelected || {}).length){
            return setError("No user was selected.");
        }
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
        await changeUserEmail(userSelected);
    }

    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer updateUserEmail >
                <div className="flex d-flex-on-mobile pad max-size">
                    <UsersLists onSelected={setUserSelected} />
                    <div className="add-update-new-user-info new-user-info-margin">
                        <div className="header">Update a user email address</div>
                        <div className="relative" style={{marginBottom:"60px"}}>
                            <div style={{height:"20px",color:"var(--primary-color)"}}><b>{userSelected?.firstName} {userSelected?.lastName}</b></div>
                            <div className="float-bottom-overflow" style={{color:"red"}}>{error}</div>
                        </div>
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
                </div>
            </AdminSettignsContainer>
        </AdminNavBar>
    )
}