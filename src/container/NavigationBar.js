import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/Authentication';
import { routes } from '../routes/Routes';

export const NavigationBar = ({children}) =>{
    const { user } = useAuth();

    const history = useHistory();

    const { signOut } = useAuth();

    const navigations = [
        {
            title: "CLOCK IN/OUT",
            route: routes.clocked
        },{
            title: "VIEW LOGS",
            route: routes.logs
        },{
            title: "SETTINGS",
            route: routes.settings
        },
    ];

    const isActive = (route) =>{
        if (route === history.location.pathname){
            return "orange";
        }
        return "";
    }

    const command = (route) =>{
        if (route) history.push(route);
    }
    return(
        <div style={{display:"flex",height:"100vh"}}>
            <div className="nav-btn-container">
                <div className="nav-btn-header">
                    <span>Time Sheet</span>
                    <div>{user?.firstName}</div>
                </div>
                {navigations.map((nav, key)=>(
                    <div
                        onClick={()=>command(nav.route)}
                        className="nav-btn"
                        style={{backgroundColor:isActive(nav.route)}}
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