import React, { useState } from 'react';
import { UserNavBar } from '../../container/UserNavBar';
import { RiLockPasswordFill } from 'react-icons/ri';
import { WhatsThis } from '../../components/widgets/WhatsThis';
import { ChangePassword } from '../../security/ChangePassord';
import { MdEmail } from 'react-icons/md';

export const Settings = () =>{
    const [showChangePassword, setShowChangePassword] = useState();

    const SETTINGS_LISTS = [
        {
            header: "Credentials Update",
            cards: [
                {
                    title: "Passwords",
                    icon: RiLockPasswordFill,
                    action: ()=>setShowChangePassword(true),
                    info: "Change my password"
                },{
                    title: "Email.",
                    icon: MdEmail,
                    action: ()=>{},
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
            <ChangePassword
                isOpen={showChangePassword} 
                onClose={()=>setShowChangePassword(false)} 
            />
        </UserNavBar>
    )
}