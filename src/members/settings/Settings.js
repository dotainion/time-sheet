import React, { useState } from 'react';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { UserNavBar } from '../../container/UserNavBar';
import { RiLockPasswordFill } from 'react-icons/ri';
import { WhatsThis } from '../../components/widgets/WhatsThis';
import { ChangePassword } from '../../security/ChangePassord';

export const Settings = () =>{
    const [showChangePassword, setShowChangePassword] = useState();

    return(
        <UserNavBar>
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
                        </div>
                    </div>
                </div>
            </ContentsWrapper>
            <ChangePassword
                isOpen={showChangePassword} 
                onClose={()=>setShowChangePassword(false)} 
            />
        </UserNavBar>
    )
}