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
            header: "Passwords Update",
            cards: [
                {
                    title: "Passwords Update",
                    icon: RiLockPasswordFill,
                    action: ()=>setShowChangePassword(true),
                    info: "Change my current passdword to a new one."
                },{
                    title: "Change my email.",
                    icon: MdEmail,
                    action: ()=>{},
                    info: "This section will change the email address linked to your account"
                }
            ]
        }
    ];
    
    return(
        <UserNavBar>
            <div className="max-size">
                {SETTINGS_LISTS.map((settings, key)=>(
                    <div key={key}>
                        <div className="settings-header">{settings?.header}</div>
                        {settings?.cards?.map((card, key2)=>(
                            <div onClick={card?.action} className="settings-card-container" key={key2}>
                                <div className="settings-inner-card-container">
                                    <card.icon className="float-top-left pad" />
                                    <div className="float-center">{card?.title}</div>
                                    <WhatsThis cssClass="float-bottom-right pad" info={card?.info}/>
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