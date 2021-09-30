import React, { useRef, useState, useEffect } from 'react';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { useAuth } from '../../../state/auth/Authentication';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { tools } from '../../../utils/tools/Tools';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';
import { IconButton } from '../../../components/widgets/IconButon';
import { Alert } from '../../../components/other/Alert';


export const UpdateEmails = () =>{
    const { user, changeEmail, changeUserEmail } = useAuth();
    const { setLoader} = useStore()

    const [userSelected, setUserSelected] = useState({});
    const [currentEmailError, setCurrentEmailError] = useState("");
    const [newEmailError, setNewEmailError] = useState("");
    const [confirmEmailError, setConfirmEmailError] = useState("");
    const [updateToggle, setUpdateToggle] = useState(false);
    const [alert, setAlert] = useState(null);

    const currentEmailRef = useRef();
    const newEmailRef = useRef();
    const confirmEmailRef = useRef();

    const onUserSelected = (uUser) =>{
        setUserSelected(uUser);
        currentEmailRef.current.value = uUser?.info?.email;
    }

    const onUpdate = async() =>{
        let STATE = true;
        if (!Object.keys(userSelected || {}).length){
            return setAlert("No user was selected.");
        }
        if (!currentEmailRef.current.value){
            STATE = false;
            setAlert("Invalid Input");
        }else if(userSelected?.info?.email !== currentEmailRef.current.value){
            STATE = false;
            setAlert("Incorrect email address");
        }
        if (!newEmailRef.current.value){
            STATE = false;
            setAlert("Invalid Input");
        }else if(!tools.isEmailValid(newEmailRef.current.value)){
            STATE = false;
            setAlert("Invalid Email Address");
        }
        if (!confirmEmailRef.current.value){
            STATE = false;
            setAlert("Invalid Input");
        }else if(newEmailRef.current.value !== confirmEmailRef.current.value){
            STATE = false;
            setAlert("Email mismatch");
        }
        if (!STATE) return  
        setLoader(true);
        let res = null;
        if (!updateToggle){
            res = await changeUserEmail(userSelected?.info?.email, newEmailRef.current.value, userSelected?.id);
        }else{
            res = await changeEmail(newEmailRef.current.value);
        }
        if (res?.error) setAlert(res?.error);
        else  setAlert("email updated successful");
        setLoader(false);
    }

    useEffect(()=>{
        if (updateToggle){
            currentEmailRef.current.value = user?.email;
            setUserSelected({info:user});
        }else{
            currentEmailRef.current.value = "";
            setUserSelected(null);
        }
        currentEmailRef.current.click();
    }, [updateToggle]);

    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer showCurrentUser={updateToggle} onSelected={onUserSelected} updateUserEmail noMultiSelect >
                <div className="pad">
                    <IconButton onClick={()=>setUpdateToggle(!updateToggle)} label="My Email" icon="email" />
                </div>
                <div className="centered" style={{marginLeft:"45%"}}>
                    <div className="header" style={{marginBottom:"60px"}}>Update {updateToggle?"my":"members"} email address</div>
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
                    <button onClick={onUpdate} className="btn btn-hover">Update</button>
                    </div>
                </div>
                <Alert 
                    isOpen={alert}
                    onClose={()=>setAlert(null)}
                    header=""
                    message={alert}
                />
            </AdminSettignsContainer>
        </AdminNavBar>
    )
}