import React, { useEffect, useRef, useState } from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { RiLockPasswordFill } from 'react-icons/ri';
import { ResetPassword } from './ResetPassword';
import { CHAGNE_PASSWORD, RESET_USER_PASSWORD } from '../../../contents/GlobalValues';
import { ChangePassword } from '../../../security/ChangePassord';
import { WhatsThis } from '../../../components/widgets/WhatsThis';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { updateSettings } from '../../../database/settings/Settings';
import { useAuth } from '../../../state/auth/Authentication';


export const AdminSettings = () =>{
    const { user } = useAuth();
    const { settings, setLoader } = useStore();

    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const durationRef = useRef();

    const onUpdateSettings = async() =>{
        setLoader(true);
        await updateSettings({
            workDuration: durationRef.current.value || 4
        }, user?.id);
        setLoader(false);
    }

    useEffect(()=>{
        durationRef.current.value = settings?.workDuration || 4;
    }, [settings]);
    return (
        <AdminNavBar>
            <ContentsWrapper isOpen>
                <div>
                    <div className="settings-card-container">
                        <div className="settings-card">
                            <div className="pad" style={{color:"orange"}}><b>Passwords Update</b></div>
                            <div className="pad">
                                <RiLockPasswordFill style={{marginRight:"5px",color:"orange"}} />
                                <span onClick={()=>setShowChangePassword(true)} className="label-hover">Change my password.</span>
                                <WhatsThis info="Change my current passdword to a new one." />
                            </div>
                            <div className="pad">
                                <RiLockPasswordFill style={{marginRight:"5px",color:"orange"}} />
                                <span onClick={()=>setShowResetPassword(true)} className="label-hover">Reset a users password.</span>
                                <WhatsThis info="This section will send a user a email with informatin to reset their account." />
                            </div>
                            <div className="pad">
                                <RiLockPasswordFill style={{marginRight:"5px",color:"red"}} />
                                <span onClick={()=>{}} className="label-hover">Advance users password reset.</span>
                                <WhatsThis info="This section will generate a temporary password that the user can use to log in then they can change their password" />
                            </div>
                        </div>
                    </div>
                    <div className="settings-card-container">
                        <div className="settings-card">
                            <div className="pad" style={{color:"orange"}}><b>Work Duration</b></div>
                            <div className="pad">
                                <input ref={durationRef} className="input input-hover" placeholder="Default work duration" style={{marginRight:"20px"}} type="number" />
                                <button onClick={onUpdateSettings} className="btn btn-hover">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentsWrapper>
            <ResetPassword 
                isOpen={showResetPassword} 
                onClose={()=>setShowResetPassword(false)} 
            />
            <ChangePassword
                isOpen={showChangePassword} 
                onClose={()=>setShowChangePassword(false)} 
            />
        </AdminNavBar>
    )
}