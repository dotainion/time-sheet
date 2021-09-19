import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../utils/routes/Routes';
import { LoginSignInNav } from '../../../layouts/LoginSignInNav';
import { FcCalendar } from 'react-icons/fc';
import { FaUsers } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { ShowErrors } from '../../../state/errors/ShowErrors';


export const SignInRegisterContainer = ({onAuthenticate, authName, loading, icon, children}) =>{
    const history = useHistory();

    const onKeyPress = (key) =>{
        if (key === "Enter"){
            onAuthenticate?.();
        }
    }
    return(
        <div className="single-page">
            <div className="flex d-flex-on-mobile" style={{height:"100vh"}}>
                <div className="max-size relative hide-on-mobile">
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
                                style={{color:"orange"}}
                            >here</label>
                        </div>
                    </div>
                </div>
                <div className="hide-on-mobile" style={{width:"10px"}}>
                    <div className="creds-seperator" />
                </div>
                <div className="max-size relative">
                    <div onKeyDown={(e)=>onKeyPress(e.key)} className="creds-container float-center">
                        <ShowErrors />
                        {
                            icon !== "email"? 
                            <FaUsers className="pad" style={{fontSize:"50px"}} />:
                            <AiOutlineMail className="pad" style={{fontSize:"50px",color:authName === "RESEND" && "green"}} />

                        }
                        {children}
                        <button onClick={onAuthenticate} disabled={loading} className="btn btn-hover creds-btn">{authName}</button>
                        <LoginSignInNav type={authName} />
                    </div>
                </div>
            </div>
        </div>
    )
}