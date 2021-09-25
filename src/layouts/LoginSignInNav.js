import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../utils/routes/Routes';


export const LoginSignInNav = ({type}) =>{
    const history = useHistory();

    const style = (opt) =>{
        return {
            backgroundColor:"transparent",
            boxShadow: "none",
            float:["SEND", "RESEND"]?.includes?.(opt) ? "left": "right",
        }
    }

    return(
        <div style={{marginTop:"15px"}}>
            <label hidden={!["SEND", "RESEND"]?.includes?.(type)? false: true} onClick={()=>history.push(routes.resetPassword)} className="cred-label btn-hover">Forget passwrod</label>
            <button hidden={type !== "LOGIN"? false: true} onClick={()=>history.push(routes.signIn)} className="btn btn-hover" style={{...style(type)}}>LOGIN</button>
            <button hidden={type !== "REGISTER"? false: true} onClick={()=>history.push(routes.register)} className="btn btn-hover" style={{...style()}}>REGISTER</button>
        </div>
    )
}