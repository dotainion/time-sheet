import React, { useEffect, useState } from 'react';
import { calendarUtils } from './Utils';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';
import { tools } from '../../utils/tools/Tools';

let DATE = new Date();
let DATES = [];

const onSwitchMonth = (month=DATE.getMonth(), year=DATE.getFullYear()) =>{
    DATES = calendarUtils .init(month, year).get();
    return DATES;
}

onSwitchMonth();

export const NavBar = ({isOpen, onUpdateDate}) =>{
    const [trigger, setTrigger] = useState(false);
    const [nowdate, setNowDate] = useState(DATE);

    const onSetDate = (demum, cmd="+") =>{
        if (cmd === "-"){
            DATE.setMonth(DATE.getMonth() - demum);
        }else{
            DATE.setMonth(DATE.getMonth() + demum);
        }
        onSwitchMonth(DATE.getMonth(), DATE.getFullYear());
        setTrigger(!trigger);
        setNowDate(DATE);
    }

    useEffect(()=>{
        onUpdateDate(DATES);
    }, [trigger])
    return(
        <div hidden={!isOpen} className="float-top-center">
            <div className="flex no-select calendar-nav-bar">
                <AiOutlineDoubleLeft 
                    onClick={()=>onSetDate(1, "-")} 
                    className="pad" 
                    style={{
                        backgroundColor:"white",
                        borderRadius:"50%",
                        marginTop:"3px",
                        marginLeft:"3px"
                    }} 
                />
                <div className="pad">
                    <span>
                        {tools.time.strMonth(nowdate.getTime())}
                        {" - "}
                        {tools.time.year(nowdate.getTime())}
                    </span>
                </div>
                <AiOutlineDoubleRight 
                    onClick={()=>onSetDate(1, "+")} 
                    className="pad" 
                    style={{
                        backgroundColor:"white",
                        borderRadius:"50%",
                        marginTop:"3px",
                        marginRight:"3px"
                    }} 
                />
            </div>
        </div>
    )
}