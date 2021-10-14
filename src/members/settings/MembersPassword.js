import React, { useState, useRef, useEffect } from 'react';
import defaultImage from '../../images/default-image.jpg';
import { IconButton } from '../../components/widgets/IconButon';
import { InputEntry } from '../../components/widgets/InputEntry';
import { useAuth } from '../../state/auth/Authentication';
import { getCreds } from '../../database/credentials/CredentialsDb';
import { secure } from '../../security/Security';
import { LoadingBar } from '../../components/widgets/LoadingBar';
import { UserNavBar } from '../../container/UserNavBar';


export const MembersPassword = () =>{
    const { user, changePassword } = useAuth();

    const [loading, setLoading] = useState(false);
    const [currentPassError, setCurrentPassError] = useState("");
    const [newPassError, setNewPassError] = useState("");
    const [ConfirmPassError, setConfirmPassError] = useState("");

    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    const onUpdate = async() =>{
        //change logged in user
        let STATE = true;
        setCurrentPassError("");
        setNewPassError("");
        setConfirmPassError("");
        if (!currentPasswordRef.current.value){
            STATE = false;
            setCurrentPassError("Invalid password");
        }
        if (!newPasswordRef.current.value){
            STATE = false;
            setNewPassError("Invalid password");
        }
        if (newPasswordRef.current.value !== confirmPasswordRef.current.value){
            STATE = false;
            setConfirmPassError("password mismatch");
        }
        if (!STATE) return;

        setLoading(true);
        const creds = await getCreds(user?.id);
        if (secure.decrypt(creds?.password) !== currentPasswordRef.current.value){
            setLoading(false);
            return setCurrentPassError("current password is incorrect");
        }

        await changePassword(newPasswordRef.current.value);
        setLoading(false);
    }
    return(
        <UserNavBar>
                <div className="centered">
                    <div className="max-width" style={{paddingTop:"100px"}}>
                        <div className="pad">
                            <div className="h-seperator">
                                <InputEntry inputRef={currentPasswordRef} label="Current Password" labelFixed type="password" error={currentPassError} errorReset={()=>setCurrentPassError("")} />
                            </div>
                            <div className="h-seperator">
                                <InputEntry inputRef={newPasswordRef} label="New Password" labelFixed type="password" error={newPassError} errorReset={()=>setNewPassError("")} />
                            </div>
                            <div className="h-seperator">
                                <InputEntry inputRef={confirmPasswordRef} label="Confirm Password" labelFixed type="password" error={ConfirmPassError} errorReset={()=>setConfirmPassError("")} />
                            </div>
                            <div className="h-seperator">
                                <IconButton onClick={onUpdate} label="UPDATE" icon="update" cssClass="pad-mini" />
                            </div>
                        </div>
                    </div>
                </div>
                <LoadingBar isOpen={loading} />
        </UserNavBar>
    )
}