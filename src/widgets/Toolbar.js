import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Calendar } from './Calendar';
import { MdDateRange } from 'react-icons/md';
import { tools } from '../tools/Tools';
import { useStore } from '../state/stateManagement';
import { HiDotsVertical } from 'react-icons/hi';

export const Toolbar = ({onMenuClick, on3DotClick, datePicker, onDatePicker}) =>{
    const { dateObject, setDateObject } = useStore();
    const [showCalendar, setShowCalendar] = useState();
    const [dateType, setDateType] = useState("");

    const onOpenCalendar = (cmd) =>{
        setDateType(cmd);
        setShowCalendar(true);
    }

    const onDateSelect = (date) =>{
        date = tools.time.digits(date);
        if (dateType.includes("from")){
            setDateObject({from:date, to:dateObject.to});
        }
        if (dateType.includes("to")){
            setDateObject({from: dateObject.from, to:date});
        }
        setShowCalendar(false);
    }

    const triggerDatePicker = () =>{
        onDatePicker?.(dateObject);
    }

    return(
        <>
            <div className="toolbar">
                <GiHamburgerMenu onClick={onMenuClick} className="HamburgerMenu float-left" />
                <div hidden={!datePicker} className="float-left">
                    {/* hidden is not working with className flex, it was sperated in standalone div */}
                    <div className="flex" style={{marginLeft:"50px"}}>
                        <div>
                            <label>From</label>
                            <div style={{fontSize:"10px"}}>{tools.time.date(dateObject.from)}</div>
                        </div>
                        <MdDateRange onClick={()=>onOpenCalendar("from")} style={{fontSize:"35px",cursor:"pointer"}} />
                        <div style={{marginLeft:"20px"}}>
                            <label>To</label>
                            <div style={{fontSize:"10px"}}>{tools.time.date(dateObject.to)}</div>
                        </div>
                        <MdDateRange onClick={()=>onOpenCalendar("to")} style={{fontSize:"35px",cursor:"pointer"}} />
                        <div className="relative" style={{marginLeft:"10px",fontWeight:"bold"}}>
                            <button
                                className="btn float-left"
                                style={{boxShadow:"none",cursor:"pointer"}}
                                onClick={triggerDatePicker}
                            >Go</button>
                        </div>
                    </div>
                </div>
                <HiDotsVertical onClick={on3DotClick} className="float-right" style={{fontSize:"20px",right:"15px",display:!on3DotClick && "none"}} />
            </div>
            <Calendar
                isOpen={showCalendar} 
                onClose={()=>setShowCalendar(false)} 
                onSelect={onDateSelect} 
            />
        </>
    )
}