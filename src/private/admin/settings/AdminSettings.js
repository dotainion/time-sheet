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
import { RiUserSettingsLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { adminRoutes } from '../../../utils/routes/Routes';
import { Entry } from '../../../components/widgets/Entry';
import { MdEmail } from 'react-icons/md';



export const AdminSettings = () =>{
    const history = useHistory();

    const { user } = useAuth();
    const { settings, setLoader } = useStore();

    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [durationError, setDurationError] = useState("");
    const [durationSuccess, setDurationSuccess] = useState("");

    const durationRef = useRef();

    const SETTINGS_LISTS = [
        {
            header: "Passwords Update",
            cards: [
                {
                    title: "Change my password.",
                    icon: RiLockPasswordFill,
                    action: ()=>setShowChangePassword(true),
                    info: "Change my current password to a new one."
                },{
                    title: "Reset a user password.",
                    icon: RiLockPasswordFill,
                    action: ()=>setShowResetPassword(true),
                    info: "This section will send a user a email with information to reset their account."
                },{
                    title: "Advance password reset.",
                    icon: RiLockPasswordFill,
                    action: ()=>history.push(adminRoutes.advanceReset),
                    info: "This section will generate a temporary password that the user can use to log in then they can change their password"
                },{
                    title: "Change my email.",
                    icon: MdEmail,
                    action: ()=>history.push(adminRoutes.updateEmail),
                    info: "This section will change the email address linked to your account"
                },{
                    title: "Change a user email.",
                    icon: MdEmail,
                    action: ()=>history.push(adminRoutes.updateUserEmail),
                    info: "This section will change the email address linked to a user account"
                }
            ]
        },{
            header: "Update Profile",
            cards: [
                {
                    title: "Update my account",
                    icon: RiUserSettingsLine,
                    action: ()=>history.push(adminRoutes.profile),
                    info: ""
                },{
                    title: "Update a user account",
                    icon: RiUserSettingsLine,
                    action: ()=>history.push(adminRoutes.usersProfile),
                    info: ""
                }
            ]
        },{
            header: "Work Duration",
            cards: [
                {
                    inputRef: durationRef,
                    errorMsg: durationError,
                    successMsg: durationSuccess,
                    endTyping: ()=>onUpdateSettings(),
                    startTyping: ()=>{
                        setDurationError("");
                        setDurationSuccess("");
                    },
                    placeholder: "Default work duration" ,
                    type: "number"
                }
            ]
        }
    ]

    const onUpdateSettings = async() =>{
        if (!durationRef.current.value || parseInt(durationRef.current.value || 0) < 1){
            return setDurationError("Must be a valid duration");
        }
        //setLoader(true);
        await updateSettings({
            workDuration: durationRef.current.value || 4
        }, user?.id);
        //setLoader(false);
        setDurationSuccess("Saved");
    }

    useEffect(()=>{
        durationRef.current.value = settings?.workDuration || 4;
    }, [settings]);
    return (
        <AdminNavBar>
            <div className="pad max-size">
                {SETTINGS_LISTS.map((settings, key)=>(
                    <div key={key}>
                        <div className="settings-header">{settings?.header}</div>
                        {settings?.cards?.map((card, key2)=>(
                            <div onClick={card?.action} className="settings-card-container" key={key2}>
                                <div className="settings-inner-card-container">
                                    {card?.icon && <card.icon 
                                        className="float-top-left pad" 
                                        style={{fontSize:"30px",cursor:"default"}} 
                                    />}
                                    <div className="float-center">
                                        <div><b>{card?.title}</b></div>
                                        {card?.inputRef && <Entry
                                            inputRef={card?.inputRef} 
                                            errorMsg={card?.errorMsg} 
                                            successMsg={card?.successMsg}
                                            endTyping={card?.endTyping}
                                            startTyping={card?.startTyping}
                                            placeholder={card?.placeholder}
                                            type={card?.type}
                                        />}
                                    </div>
                                </div>
                                <WhatsThis 
                                    cssClass="float-bottom-right pad" 
                                    info={card?.info}
                                    style={{marginRight:"15px",fontSize:"20px"}}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
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