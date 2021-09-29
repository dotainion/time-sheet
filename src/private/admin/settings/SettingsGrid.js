import React, { useEffect, useRef, useState } from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { updateSettings } from '../../../database/settings/Settings';
import { useAuth } from '../../../state/auth/Authentication';
import { RiUserSettingsLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { adminRoutes } from '../../../utils/routes/Routes';
import { MdEmail } from 'react-icons/md';



export const SettingsGrid = () =>{
    const history = useHistory();

    const { user } = useAuth();
    const { settings } = useStore();

    const [durationError, setDurationError] = useState("");
    const [durationSuccess, setDurationSuccess] = useState("");

    const durationRef = useRef();

    const SETTINGS_LISTS = [
        {
            header: "Passwords Update",
            cards: [
                {
                    title: "Password",
                    icon: RiLockPasswordFill,
                    action: ()=>history.push(adminRoutes.advanceReset),
                    info: "Your password, Chagne user password"
                },{
                    title: "Change Email.",
                    icon: MdEmail,
                    action: ()=>history.push(adminRoutes.updateUserEmail),
                    info: "Your email, User email"
                }
            ]
        },{
            header: "Update Profile",
            cards: [
                {
                    title: "Profile Account",
                    icon: RiUserSettingsLine,
                    action: ()=>history.push(adminRoutes.usersProfile),
                    info: "Your profile, user profile"
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
        //durationRef.current.value = settings?.workDuration || 4;
    }, [settings]);
    return (
        <AdminNavBar>
            <div className="pad max-size">
                {SETTINGS_LISTS.map((settings, key)=>(
                    <div key={key}>
                        <div className="settings-header">{settings?.header}</div>
                        {settings?.cards?.map((card, key2)=>(
                            <div onClick={card?.action} className="settings-card-container" key={key2}>
                                <div className="float-left pad max-width no-wrap flex">
                                    <div>{card?.icon && <card.icon className="pad" style={{fontSize:"40px"}} />}</div>
                                    <div className="relative">
                                        <div className="float-left">
                                            <b>{card?.title}</b>
                                            <div style={{fontSize:"14px"}}>{card?.info}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </AdminNavBar>
    )
}
/**
 * <div className="">
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
 */