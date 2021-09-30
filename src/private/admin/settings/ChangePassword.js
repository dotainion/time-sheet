import React, { useState, useRef, useEffect } from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';
import defaultImage from '../../../images/default-image.jpg';
import { IconButton } from '../../../components/widgets/IconButon';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { useAuth } from '../../../state/auth/Authentication';
import { getCreds } from '../../../database/credentials/CredentialsDb';
import { secure } from '../../../security/Security';
import { LoadingBar } from '../../../components/widgets/LoadingBar';


export const ChangePassword = () =>{
    const { user, changePassword, resetPasswordViaEmail } = useAuth();

    const [updateToggle, setUpdateToggle] = useState(false);
    const [userSelected, setUserSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    const emailToSentResetRef = useRef();

    const changeCurrentUserPassword = async() =>{
        //change logged in user
        if (!currentPasswordRef.current.value){
            return alert("Invalid password")
        }
        if (newPasswordRef.current.value !== confirmPasswordRef.current.value){
            return alert("password mismatch");
        }
        setLoading(true);
        const creds = await getCreds(user?.id);
        if (secure.decrypt(creds?.password) !== currentPasswordRef.current.value){
            setLoading(false);
            return alert("current password is incorrect");
        }

        await changePassword(newPasswordRef.current.value);
        setLoading(false);
    }

    const sendEmailToResetUserPassword = async() =>{
        setLoading(true);
        await resetPasswordViaEmail(emailToSentResetRef.current.value);
        setLoading(false);
    }

    const onUpdate = () =>{
        if (updateToggle){
            changeCurrentUserPassword();
        }else{
            sendEmailToResetUserPassword();
        }
    }

    useEffect(()=>{
        if (Object.keys(userSelected || {}).length && !updateToggle){
            emailToSentResetRef.current.value = userSelected?.info?.email || "";
            emailToSentResetRef.current.click();
        }
    }, [userSelected]);

    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer showCurrentUser={updateToggle} onSelected={setUserSelected} noMultiSelect advanceReset>
                <div className="pad">
                    <IconButton onClick={()=>setUpdateToggle(!updateToggle)} label="My Email" icon="email" />
                </div>
                <div className="flex">
                    <div className="" style={{padding:"40px",width:"200px"}}>
                        <img src={updateToggle?user?.image: userSelected?.info?.image || defaultImage} style={{height:"200px",width:"200px"}} alt="" />
                    </div>
                    <div className="max-width" style={{width:"350px",paddingTop:"20px"}}>
                        <div hidden={!updateToggle} className="pad">
                            <div className="h-seperator">
                                <InputEntry inputRef={currentPasswordRef} label="Current Password" labelFixed type="password" />
                            </div>
                            <div className="h-seperator">
                                <InputEntry inputRef={newPasswordRef} label="New Password" labelFixed type="password" />
                            </div>
                            <div className="h-seperator">
                                <InputEntry inputRef={confirmPasswordRef} label="Confirm Password" labelFixed type="password" />
                            </div>
                            <div className="h-seperator">
                                <IconButton onClick={onUpdate} label="UPDATE" icon="update" cssClass="pad-mini" />
                            </div>
                        </div>
                        <div hidden={updateToggle} className="pad">
                            <p style={{marginBottom:"30px"}}>Send email link to you to reset their password</p>
                            <div className="h-seperator">
                                <InputEntry inputRef={emailToSentResetRef} label="Email" email labelFixed />
                            </div>
                            <div className="h-seperator">
                                <IconButton onClick={onUpdate} label="UPDATE" icon="update" cssClass="pad-mini" />
                            </div>
                        </div>
                    </div>
                </div>
                <LoadingBar isOpen={loading} />
            </AdminSettignsContainer>
        </AdminNavBar>
    )
}