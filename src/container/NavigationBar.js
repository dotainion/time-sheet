import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../state/auth/Authentication';
import { Toolbar } from '../components/widgets/Toolbar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoPrimitiveDot } from 'react-icons/go';
import { SelectOptions } from '../components/widgets/SelectOptions';
import { adminRoutes } from '../utils/routes/Routes';

const SETTINGS_ROUTES = [
    adminRoutes.profile,
    adminRoutes.usersProfile,
    adminRoutes.advanceReset,
    adminRoutes.updateEmail,
    adminRoutes.updateUserEmail
]

let TOGGLE_STATE = false;
export const NavigationBar = ({menues, datePicker, onDatePicker, defaultOptionValue, options, onOptionChange, children}) =>{
    const history = useHistory();

    const { user, signOut } = useAuth();

    const [navToggle, setNavToggle] = useState(true);
    const [showOptons, setShowOptions] = useState(false);

    const isSettingsRoute = (nav) =>{
        return nav === adminRoutes.settings?true:false;
    }

    const isRouteInSettings = () =>{
        return SETTINGS_ROUTES.includes(history.location.pathname);
    }

    const isActive = (nav) =>{
        if (history.location.pathname === nav?.route){
            return "nav-btn-is-active";
        }else if (isSettingsRoute(nav?.route) && isRouteInSettings()){
            return "nav-btn-is-active";
        }
        return "";
    }

    const toggleNav = () =>{
        setNavToggle(!navToggle);
    }

    const onDotMenuToggle = () =>{
        TOGGLE_STATE = !TOGGLE_STATE
        setShowOptions(TOGGLE_STATE);
    }

    return(
        <div style={{display:"flex",height:"100vh"}}>
            <div onClick={toggleNav} className={`nav-backdrop-on-mobile ${navToggle && "hide-on-mobile"}`}/>
            <div className={`nav-btn-container mobile-nav ${navToggle && "hide-on-mobile"}`}>
                <div className="nav-btn-header">
                    <GiHamburgerMenu onClick={toggleNav} className="float-left HamburgerMenu" />
                    <span>Time Sheet</span>
                    <div>{user?.firstName}</div>
                </div>
                {menues?.map((nav, key)=>(
                    <div
                        onClick={()=>history.push(nav?.route)}
                        className={`nav-btn ${isActive(nav) && "nav-btn-is-active"}`}
                        key={key}>
                        <span>{nav?.title}</span>
                        <GoPrimitiveDot
                            className="nav-btn-is-active"
                            style={{float:"right",display:!isActive(nav) && "none"}}
                        />
                    </div>
                ))}
                <div onClick={signOut}className="nav-btn" style={{color:"orangered"}}>SIGN OUT</div>
            </div>
            <div className="relative" style={{width:"100%"}}>
                <Toolbar
                    datePicker={datePicker}
                    onMenuClick={toggleNav} 
                    onDatePicker={onDatePicker} 
                    on3DotClick={options && onDotMenuToggle}
                />
                <div hidden={!showOptons} className="nav-option-select-container centered">
                    {options?.map?.((opt, key)=>(
                        <SelectOptions 
                            onChange={onOptionChange} 
                            defaultValue={defaultOptionValue} 
                            options={opt} 
                            cssClass="nav-option-select" 
                            key={key}
                        />
                    ))}
                </div>
                {children}
            </div>
        </div>
    )
}