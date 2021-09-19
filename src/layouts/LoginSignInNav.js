import React from 'react';
import { useHistory } from 'react-router-dom';
import { InputCheckbox } from '../components/widgets/InputCheckbox';
import { routes } from '../utils/routes/Routes';
import { AiOutlineMail } from 'react-icons/ai';

export const LoginSignInNav = ({type}) =>{
    const history = useHistory();

    const style = {
        backgroundColor:"transparent",
        boxShadow: "none",
        float:"right",
    }

    return(
        <div style={{marginTop:"15px"}}>
            <label onClick={()=>{}} className="cred-label btn-hover">Forget passwrod</label>
            <button hidden={type !== "LOGIN"? false: true} onClick={()=>history.push(routes.signIn)} className="btn btn-hover" style={{...style}}>LOGIN</button>
            <button hidden={type !== "REGISTER"? false: true} onClick={()=>history.push(routes.register)} className="btn btn-hover" style={{...style}}>REGISTER</button>
        </div>
    )
}