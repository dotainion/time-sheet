import React from 'react';
import { useHistory } from 'react-router';
import { adminRoutes } from '../../utils/routes/Routes';


export const BreadCrumbs = () =>{
    const history = useHistory();
    return(
        <div className="float-top-left pad hide-on-mobile">
            <span
                onClick={()=>history.push(adminRoutes.settings)} 
                className="label-hover"
            >Setttings{" >"}</span>&nbsp;
            <span
                onClick={()=>history.push(adminRoutes.profile)} 
                className="label-hover"
            >My profile{" >"}</span>&nbsp;
            <span
                onClick={()=>history.push(adminRoutes.updateEmail)} 
                className="label-hover"
            >Update email{" >"}</span>&nbsp;
            <span
                onClick={()=>history.push(adminRoutes.updateUserEmail)} 
                className="label-hover"
            >Update user email{" >"}</span>&nbsp;
            <span
                onClick={()=>history.push(adminRoutes.advanceReset)} 
                className="label-hover"
            >Advance password reset</span>
        </div>
    )
}