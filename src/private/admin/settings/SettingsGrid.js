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
import { Entry } from '../../../components/widgets/Entry';
import { InputSelect } from '../../../components/widgets/InputSelect';



export const SettingsGrid = () =>{
    const history = useHistory();

    const { user } = useAuth();
    const { settings } = useStore();

    const durationRef = useRef();

    const SETTINGS_LISTS = [
        {
            header: "Credentials Update",
            cards: [
                {
                    title: "Password",
                    icon: RiLockPasswordFill,
                    action: ()=>history.push(adminRoutes.passwordChange),
                    info: "Your password, Change user password"
                },{
                    title: "Change Email",
                    icon: MdEmail,
                    action: ()=>history.push(adminRoutes.updateEmail),
                    info: "Your email, User email"
                }
            ]
        },{
            header: "Update Profile",
            cards: [
                {
                    title: "Profile Account",
                    icon: RiUserSettingsLine,
                    action: ()=>history.push(adminRoutes.profile),
                    info: "Your profile, user profile"
                }
            ]
        },{
            header: "Work Duration",
            cards: [
                {
                    inputRef: durationRef,
                    onChange: ()=> onUpdateSettings(),
                    defaultOption: settings?.workDuration || 4,
                    options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
                }
            ]
        }
    ]

    const onUpdateSettings = async() =>{
        if (settings?.workDuration === durationRef.current.value){
            return;
        }
        await updateSettings({
            workDuration: durationRef.current.value || 4
        }, user?.id);
    }

    return (
        <AdminNavBar>
            <div style={{overflowY:"auto",height:"92vh"}}>
                {SETTINGS_LISTS.map((settings, key)=>(
                    <div className="pad" key={key}>
                        <div className="settings-header">{settings?.header}</div>
                        {settings?.cards?.map((card, key2)=>(
                            <div className="settings-card-container no-select" key={key2}>
                                <div className="float-left no-wrap flex">
                                    <div>{card?.icon && <card.icon className="pad" style={{fontSize:"40px"}} />}</div>
                                    <div className="relative">
                                        <div className="float-left">
                                            <b onClick={card?.action} className="label-hover">{card?.title}</b>
                                            <div style={{fontSize:"14px"}}>{card?.info}</div>
                                            {card?.inputRef && <InputSelect
                                                inputRef={card?.inputRef} 
                                                onChange={card?.onChange}
                                                options={card?.options}
                                                defaultOption={card?.defaultOption}
                                            />}
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
