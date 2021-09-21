import React, { useEffect, useState } from 'react';
import { Profile } from '../components/other/Profile';
import { ADMIN_SIDE_NAV, USER_SIDE_NAV } from '../contents/lists';
import { useAuth } from '../state/auth/Authentication';
import { TiArrowBack } from 'react-icons/ti';
import { useHistory } from 'react-router';
import { WidgetsInfo } from '../components/widgets/WidgetsInfo';
import { DaysPicker } from '../apps/calendar/Calendar';
import { SpanWrapper } from '../container/SpanWrapper';
import { FcCalendar, FcCalculator } from 'react-icons/fc';
import Calculator from "awesome-react-calculator";
import { Backdrop } from '../container/Backdrop';
import { ADMIN_SUPERVISER } from '../contents/AuthValue';



const COLORS = ["teal", "red", "dodgerblue", "orange", "green", "purple", "teal", "dodgerblue", "red", "dodgerblue"]
export const Grid = () =>{
    const history = useHistory();

    const { user } = useAuth();

    const [navigations, setNavigations] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);

    const APPS = [
        {
            title: "Calendar",
            icon: FcCalendar,
            action: ()=>setShowCalendar(true),
            info: ""
        },{
            title: "Calculator",
            icon: FcCalculator,
            action: ()=>setShowCalculator(true),
            info: ""
        }
    ];

    const hideCard = (index) =>{
        if ([0,1].includes(index)) return "none";
        return null;
    }

    useEffect(()=>{
        if (ADMIN_SUPERVISER.includes(user?.role)){
            setNavigations(ADMIN_SIDE_NAV);
        }else{
            setNavigations(USER_SIDE_NAV);
        }
    }, []);

    return(
        <div className="grid-page">
            <div className="float-top-left grid-single">
                <WidgetsInfo info="Back">
                    <TiArrowBack onClick={()=>history.goBack()} style={{fontSize:"40px"}} />
                </WidgetsInfo>
            </div>
            <div className="float-top-right" style={{color:"white",top:"20px"}}>
                <Profile
                    floatLeft
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    image={user?.image}
                    role={user?.role}
                />
            </div>
            <div className="max-size">
                <div className="grid-card-container">
                    {navigations.map((nav, key)=>(
                        <div onClick={()=>history.push(nav?.route)} style={{display:hideCard(key)}} className="grid-card" key={key}>
                            <div className="grid-inner-card">
                                <nav.icon className="float-center" style={{fontSize:"40px",color:COLORS[key]}} />
                                <div className="float-top-left pad">{nav?.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{color:"red",marginTop:"20px",fontSize:"25px",marginLeft:"50px"}}>Apps</div>
                <div className="grid-card-container">
                    {APPS.map((nav, key)=>(
                        <div onClick={nav?.action} className="grid-card" key={key}>
                            <div className="grid-inner-card">
                                {nav?.icon && <nav.icon className="float-center" style={{fontSize:"40px",color:COLORS[key]}} />}
                                <div className="float-bottom-left pad">{nav?.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Backdrop 
                isOpen={showCalendar} 
                onClose={()=>setShowCalendar(false)}>
                <div onClick={e=>e.stopPropagation()}>
                    <SpanWrapper 
                        isOpen 
                        onClose={()=>setShowCalendar(false)}>
                        <DaysPicker />
                    </SpanWrapper>
                </div>
            </Backdrop>

            <Backdrop 
                isOpen={showCalculator}
                onClose={()=>setShowCalculator(false)}>
                <div onClick={e=>e.stopPropagation()}>
                    <SpanWrapper 
                        isOpen 
                        onClose={()=>setShowCalculator(false)}
                        childrenStyle={{width:"400px", height:"500px"}}>
                        <Calculator />
                    </SpanWrapper>
                </div>
            </Backdrop>
        </div>
    )
}