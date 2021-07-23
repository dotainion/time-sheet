import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/Authentication';
import { routes } from '../routes/Routes';

export const AdminNavBar = ({onBeforeClick, navigations, children}) =>{
    const history = useHistory();

    const { signOut } = useAuth();

    const isActive = (state) =>{
        if (state){
            return "orange";
        }
        return "";
    }

    const onCommand = (onAction) =>{
        onBeforeClick?.(false);
        onAction?.(true);
    }

    return(
        <div style={{display:"flex",height:"100vh"}}>
            <div className="nav-btn-container">
                <div className="nav-btn-header">Administrator</div>
                {navigations?.map((nav, key)=>(
                    <div
                        onClick={()=>onCommand(nav?.action)}
                        className="nav-btn"
                        style={{backgroundColor:isActive(nav.state)}}
                        key={key}>
                        <span>{nav.title}</span>
                    </div>
                ))}
                <div onClick={signOut}className="nav-btn" style={{color:"orangered"}}>SIGN OUT</div>
            </div>
            <div style={{width:"100%"}}>
                {children}
            </div>
        </div>
    )
}