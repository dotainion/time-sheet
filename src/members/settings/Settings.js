import React, { useState } from 'react';
import { UserNavBar } from '../../container/UserNavBar';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { useHistory } from 'react-router';
import { routes } from '../../utils/routes/Routes';

export const Settings = () =>{
    const history = useHistory();

    const SETTINGS_LISTS = [
        {
            header: "Credentials Update",
            cards: [
                {
                    title: "Passwords",
                    icon: RiLockPasswordFill,
                    action: ()=>history.push(routes.changePassword),
                    info: "Change my password"
                },{
                    title: "Email.",
                    icon: MdEmail,
                    action: ()=>history.push(routes.changeEmail),
                    info: "Update email linked to your account"
                }
            ]
        }
    ];
    
    return(
        <UserNavBar>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </UserNavBar>
    )
}