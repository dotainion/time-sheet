import React from 'react';
import { useAuth } from '../../state/auth/Authentication';
import img from '../../images/default-profile-image.png';
import { useStore } from '../../state/stateManagement/stateManagement';

export const Profile = ({cssClass}) =>{
    const { user } = useAuth();
    const { onContinue } = useStore();

    return(
        <div className={cssClass?cssClass:"profile"} style={{}}>
            <img className="profile-image" src={img} draggable={false} alt="" />
            <div>{`${user?.firstName || "Profile"} ${user?.lastName || "name"}`}</div>
            <button 
                className="btn pad btn-hover"
                style={{backgroundColor:"orange",color:"white",boxShadow:"4px 4px 5px gray",marginTop:"10px"}}
                onClick={onContinue}
            >Go to my profile...</button>
        </div>
    )
}