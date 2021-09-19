import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../state/auth/Authentication';
import { adminRoutes, routes } from '../../../utils/routes/Routes';
import { LoginSignInNav } from '../../../layouts/LoginSignInNav';
import { useError } from '../../../state/errors/Error';
import { SideInfo } from '.././widgets/SideInfo';
import { ADMIN_SUPERVISER } from '../../../contents/AuthValue';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { FcCalendar } from 'react-icons/fc';
import { FaUsers } from 'react-icons/fa';
import { ShowErrors } from '../../../state/errors/ShowErrors';


export const LoginSignInContainer = ({onAuthenticate, authName, loading, children}) =>{
    const history = useHistory();

    const onKeyPress = (key) =>{
        if (key === "Enter"){
            onAuthenticate?.();
        }
    }
    return(
        <div className="single-page">
            <div className="flex" style={{height:"100vh"}}>
                <div className="max-size relative">
                    <div className="creds-left-info float-center" style={{textAlign:"center"}}>
                        <div style={{borderBottom:"1px solid white"}}>
                            <FcCalendar style={{marginRight:"10px"}} />
                            <span>TIME TRACKER</span>
                        </div>
                        <div className="pad" style={{textAlign:"left",fontSize:"18px",backgroundColor:"rgb(0,0,0,0.50)"}}>
                            <label>See hour pricing click </label>
                            <label 
                                onClick={()=>history.push(routes.pricing)} 
                                className="cred-label2"
                                style={{color:"navy"}}
                            >here</label>
                        </div>
                    </div>
                </div>
                <div style={{width:"10px"}}>
                    <div className="creds-seperator" />
                </div>
                <div className="max-size relative">
                    <div onKeyDown={(e)=>onKeyPress(e.key)} className="creds-container float-center">
                        <ShowErrors/>
                        <FaUsers className="pad" style={{fontSize:"50px"}} />
                        {children}
                        <button onClick={onAuthenticate} disabled={loading} className="btn btn-hover creds-btn">{authName}</button>
                        <LoginSignInNav type={authName} />
                    </div>
                </div>
            </div>
        </div>
    )
}