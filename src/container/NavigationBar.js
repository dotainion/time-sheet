import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/Authentication';
import { Toolbar } from '../widgets/Toolbar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoPrimitiveDot } from 'react-icons/go';
import { SelectOptions } from '../widgets/SelectOptions';

export const NavigationBar = ({menues, onOptionClick, datePicker, onDatePicker, defaultOptionValue, options, onOptionChange, children}) =>{
    const history = useHistory();

    const { user, signOut } = useAuth();

    const [navToggle, setNavToggle] = useState(true);

    const isActive = (nav) =>{
        if (history.location.pathname === nav?.route){
            return "nav-btn-is-active";
        }
        return "";
    }

    const toggleNav = () =>{
        setNavToggle(!navToggle);
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
                    onOptionClick={onOptionClick}
                />
                <SelectOptions onChange={onOptionChange} defaultValue={defaultOptionValue} options={options} cssClass="nav-option-select" />
                {children}
            </div>
        </div>
    )
}