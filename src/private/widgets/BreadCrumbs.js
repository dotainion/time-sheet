import React from 'react';
import { useHistory } from 'react-router';
import { adminRoutes } from '../../utils/routes/Routes';


export const BreadCrumbs = ({settings, myProfile, updateUserEmail, updateEmail, advanceReset}) =>{
    const history = useHistory();
    return(
        <div className="float-top-left pad hide-on-mobile" style={{color:"var(--primary-color)"}}>
            <span
                onClick={()=>history.push(adminRoutes.settings)} 
                className="label-hover"
                style={{display:settings && "none"}}
            >Setttings{" >"}</span>&nbsp;
            <span
                onClick={()=>history.push(adminRoutes.profile)} 
                className="label-hover"
                style={{display:myProfile && "none"}}
            >My profile{" >"}</span>&nbsp;
            <span
                onClick={()=>history.push(adminRoutes.updateEmail)} 
                className="label-hover"
                style={{display:updateEmail && "none"}}
            >Update email{" >"}</span>&nbsp;
            <span
                onClick={()=>history.push(adminRoutes.updateUserEmail)} 
                className="label-hover"
                style={{display:updateUserEmail && "none"}}
            >Update user email{" >"}</span>&nbsp;
            <span
                onClick={()=>history.push(adminRoutes.advanceReset)} 
                className="label-hover"
                style={{display:advanceReset && "none"}}
            >Advance password reset</span>
        </div>
    )
}