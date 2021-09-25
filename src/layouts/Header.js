import React from 'react';
import defaultImg from '../images/default-profile-image.png';
import { useAuth } from '../state/auth/Authentication';

export const Header = () =>{
    const { user } = useAuth();
    return(
        <div className="flex float-center max-width">
            <div className="max-width">

            </div>
            <div>
                <img src={user?.image || defaultImg} style={{width:"45px", height:"45px", borderRadius:"50%"}} alt="" />
            </div>
            <div className="relative" style={{width:"300px",overflow:"hidden"}}>
                <div className="float-left" style={{left:"10px"}}>{user?.firstName} {user?.lastName}</div>
            </div>
        </div>
    )
}