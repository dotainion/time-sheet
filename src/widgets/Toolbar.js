import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Calendar } from './Calendar';
import { MdDateRange } from 'react-icons/md';
import { tools } from '../tools/Tools';

export const Toolbar = ({onMenuClick, onDatePicker}) =>{
    const [showCalendar, setShowCalendar] = useState();
    const [dateType, setDateType] = useState("");
    const [fromDate, setFromDate] = useState(tools.time.date());
    const [toDate, setToDate] = useState(tools.time.date());

    const onOpenCalendar = (cmd) =>{
        setDateType(cmd);
        setShowCalendar(true);
    }

    const onDateSelect = (date) =>{
        date = tools.time.date(date);
        if (dateType.includes("to")) setToDate(date);
        if (dateType.includes("from")) setFromDate(date);
        setShowCalendar(false);
    }

    const triggerDatePicker = () =>{
        onDatePicker?.({from: fromDate, to: toDate});
    }
    return(
        <>
            <div className="toolbar">
                <div hidden={!onDatePicker} className="float-left">
                    {/* hidden is not working with className flex, it was sperated in standalone div */}
                    <div className="flex">
                        <GiHamburgerMenu onClick={onMenuClick} className="HamburgerMenu" />
                        <div style={{marginLeft:"50px"}}>
                            <label>From</label>
                            <div style={{fontSize:"10px"}}>{fromDate}</div>
                        </div>
                        <MdDateRange onClick={()=>onOpenCalendar("from")} style={{fontSize:"35px"}} />
                        <div style={{marginLeft:"20px"}}>
                            <label>To</label>
                            <div style={{fontSize:"10px"}}>{toDate}</div>
                        </div>
                        <MdDateRange onClick={()=>onOpenCalendar("to")} style={{fontSize:"35px"}} />
                        <div className="relative" style={{marginLeft:"10px",fontWeight:"bold"}}>
                            <button
                                className="btn float-left"
                                style={{boxShadow:"none"}}
                                onClick={triggerDatePicker}
                            >Go</button>
                        </div>
                    </div>
                </div>
            </div>
            <Calendar
                isOpen={showCalendar} 
                onClose={()=>setShowCalendar(false)} 
                onSelect={onDateSelect} 
            />
        </>
    )
}