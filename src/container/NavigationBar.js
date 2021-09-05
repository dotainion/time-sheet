import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../state/auth/Authentication';
import { Toolbar } from '../components/widgets/Toolbar';
import { GiHamburgerMenu, GiTrebuchet } from 'react-icons/gi';
import { GoPrimitiveDot } from 'react-icons/go';
import { SelectOptions } from '../components/widgets/SelectOptions';
import { adminRoutes } from '../utils/routes/Routes';
import { tools } from '../utils/tools/Tools';
import { CgShare } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi';
import { ButtonOption } from '../components/widgets/ButtonOption';

//holds rouutes only for within settings
const SETTINGS_ROUTES = [
    adminRoutes.profile,
    adminRoutes.usersProfile,
    adminRoutes.advanceReset,
    adminRoutes.updateEmail,
    adminRoutes.updateUserEmail
]

let TOGGLE_STATE = false;
export const NavigationBar = ({menues, options, children}) =>{
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

    const onShare = () =>{
        tools.share(`${user?.firstName} ${user?.lastName}`);
    }

    return(
        <div style={{display:"flex",height:"100vh"}}>
            <div onClick={toggleNav} className={`nav-backdrop-on-mobile ${navToggle && "hide-on-mobile"}`}/>
            <div className={`nav-btn-container mobile-nav ${navToggle && "hide-on-mobile"}`}>
                <div className="nav-btn-header">
                    <GiHamburgerMenu onClick={toggleNav} className="float-left HamburgerMenu" />
                    <span>Time Sheet</span>
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
                        {nav?.icon && <nav.icon
                            className="float-right nav-btn-icon"
                            style={{display:isActive(nav) && "none"}}
                        />}
                    </div>
                ))}
                <div onClick={onShare} className="nav-btn" >Share<CgShare className="float-right nav-btn-icon" /></div>
                <div onClick={signOut} className="nav-btn" style={{color:"orangered"}}>SIGN OUT<BiLogOutCircle className="float-right nav-btn-icon" /></div>
            </div>
            <div className="relative" style={{width:"100%"}}>
                <Toolbar
                    onMenuClick={toggleNav} 
                    on3DotClick={options && onDotMenuToggle}
                />
                <div hidden={!showOptons} className="nav-btn-option-container">
                    <div>Menu</div>
                    {options?.map?.((opt, key)=>(
                        <ButtonOption
                            options={opt}
                            style={{
                                width:"auto",
                                display:"inline-block",
                                paddingLeft:"2px",
                                paddingRight:"2px",
                                margin:"2px",
                                border:"1px solid white"
                            }}
                            onDidClick={onDotMenuToggle}
                            key={key}
                        />
                    ))}
                </div>
                {children}
            </div>
        </div>
    )
}