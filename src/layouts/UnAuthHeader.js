import React from 'react';
import { useHistory } from 'react-router-dom';
import { useError } from '../errors/Error';
import { routes } from '../routes/Routes';

export const UnAuthHeader = ({useRegister, useLogin, usePricing}) =>{
    const history = useHistory();

    const { error } = useError();

    return(
        <div className="auther-header-container">
            <label>Time Sheet</label>
            <div className="float-right auth-header-btn-container">
                <button hidden={!useLogin} onClick={()=>history.push(routes.signIn)} className="btn btn-hover auth-header-btn">LOGIN</button>
                <button hidden={!useRegister} onClick={()=>history.push(routes.register)} className="btn btn-hover auth-header-btn">REGISTER</button>
                <button hidden={!usePricing} onClick={()=>history.push("#")} className="btn btn-hover auth-header-btn" style={{backgroundColor:"var(--dark-orange)"}}>PRICING</button>
            </div>
            {error && <div className="float-bottom-overflow error">{error}</div>}
        </div>
    )
}