import React from 'react';
import { useHistory } from 'react-router-dom';
import { ShowErrors } from '../state/errors/ShowErrors';
import { routes } from '../utils/routes/Routes';

export const UnAuthHeader = ({useRegister, useLogin, usePricing}) =>{
    const history = useHistory();

    return(
        <div className="auth-header-container">
            <label>Time Sheet</label>
            <div className="float-right auth-header-btn-container">
                <button hidden={!useLogin} onClick={()=>history.push(routes.signIn)} className="btn btn-hover auth-header-btn">LOGIN</button>
                <button hidden={!useRegister} onClick={()=>history.push(routes.register)} className="btn btn-hover auth-header-btn">REGISTER</button>
                <button hidden={!usePricing} onClick={()=>history.push(routes.pricing)} className="btn btn-hover auth-header-btn" style={{backgroundColor:"var(--dark-orange)"}}>PRICING</button>
            </div>
            <ShowErrors/>
        </div>
    )
}