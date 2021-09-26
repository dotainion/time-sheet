import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../state/auth/Authentication';
import { adminRoutes } from '../utils/routes/Routes';
import { WidgetsInfo } from '../components/widgets/WidgetsInfo';
import { Profile } from '../components/other/Profile';
import $ from 'jquery';
import { Button } from '../components/widgets/Buttons';
import { MdNotificationsActive } from 'react-icons/md';
import { useStore } from '../state/stateManagement/stateManagement';



export const NavigationBar = ({menues, isActive, children}) =>{
    const history = useHistory();

    const { user, signOut } = useAuth();
    const { notifications } = useStore();

    const navRef = useRef();
    const pageRef = useRef();

    const forMenu = (nav, index) =>{
        if (index){
            if (isActive && nav?.route === adminRoutes.settings){
                return {backgroundColor:"var(--hover-selected)"}; 
            }
            if (history.location.pathname === nav?.route){
                return {backgroundColor:"var(--hover-selected)"};
            }
            return {};
        }
        return {//only gets set in mneu 
            height:"52px",
            backgroundColor:"dodgerblue"
        }
    }

    const onNavClick = (nav) =>{
        if (nav.title === menues?.[0].title){
            return $(navRef.current).animate({width:"toggle"})
        }
        history.push(nav?.route || "#");
    }

    const onNavHover = (nav, id, state) =>{
        if (history.location.pathname === nav?.route) return;

        const bg = forMenu(null).backgroundColor;
        const left = document.getElementById(`${id}`);
        const right = document.getElementById(`${id}-left`);
        
        if (state){
            left.style.backgroundColor = id.includes("0")?"rgb(6, 85, 163)":"var(--hover-nav)";
            right.style.backgroundColor = id.includes("0")?"rgb(6, 85, 163)":"var(--hover-nav)";
        }else{
            if (isActive && nav?.route === adminRoutes.settings){
                left.style.backgroundColor = "var(--hover-nav)";
                right.style.backgroundColor = "var(--hover-nav)";
            }else{
                left.style.backgroundColor = id.includes("0")?bg:"";
                right.style.backgroundColor = id.includes("0")?bg:"";
            }
        }
        
    }

    useEffect(()=>{
        setTimeout(() => {
            $(pageRef.current).show("slow");
        }, 50);
    }, []);

    return(
        <div className="flex d-flex-on-mobile" style={{height:"100vh"}}>
            <div className="nav-container">                
                <div>
                    {menues.map((nav, key)=>(
                        <div 
                            id={`${key}navs`} 
                            onMouseEnter={()=>onNavHover(nav, `${key}navs`, true)} 
                            onMouseLeave={()=>onNavHover(nav, `${key}navs`, false)} 
                            onClick={()=>onNavClick(nav)} 
                            className="nav-item" 
                            style={forMenu(nav, key)} 
                            key={key}
                        >
                            <WidgetsInfo info={nav.info}>
                                <nav.icon className="pad block" style={{fontSize:"30px"}} />
                            </WidgetsInfo>
                        </div>
                    ))}
                </div>
                <div ref={navRef}>
                    {menues.map((nav, key)=>(
                        <div 
                            id={`${key}navs-left`} 
                            onMouseEnter={()=>onNavHover(nav, `${key}navs`, true)} 
                            onMouseLeave={()=>onNavHover(nav, `${key}navs`, false)} 
                            onClick={()=>onNavClick(nav)} 
                            className="nav-item" 
                            style={forMenu(nav, key)} 
                            key={key}
                        >
                            <div className="max-width relative no-wrap" style={{width:"180px"}}>
                                <div className="float-left">{nav.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="page-container">
                <div className="header-container">
                    <div className="relative" style={{float:"left",width:"50px",height:"100%"}}>
                        <div onClick={()=>history.push(adminRoutes.notification)} hidden={!notifications?.length} className="float-center" style={{cursor:"pointer"}}>
                            <MdNotificationsActive style={{color:"red",fontSize:"20px"}} />
                            <div className="float-center" style={{color:"red",top:"0px",left:"130%",zIndex:"99"}}>{notifications?.length || 0}</div>
                        </div>
                    </div>
                    <div style={{float:"right",paddingTop:"15px",paddingRight:"20px"}}>
                        <Button onClick={signOut} label="Logout" style={{backgroundColor:"transparent",color:"black"}} />
                    </div>
                    <Profile 
                        primaryColor 
                        image={user?.image}
                        firstName={user?.firstName}
                        lastName={user?.lastName}
                        role={user?.role}
                    />
                </div>
                <div ref={pageRef} className="pad relative page-animate">
                    {children}
                </div>
            </div>
        </div>
    )
}