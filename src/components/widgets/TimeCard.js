import React, { useEffect, useState } from 'react';
import { Modal } from '../../container/Modal';
import { tools } from '../../utils/tools/Tools';


export const TimeCart = ({isOpen, onClose, timeOptions, useSchedule, name}) =>{
    const [totalHours, setTotalHours] = useState();

    const calcTotalLog = () =>{

    }

    const calcTotalSchedule = () =>{
        let total = 0;
        for (let time of timeOptions || []){
            total = total + parseInt(time?.duration);
        }
        setTotalHours(total);
    }

    useEffect(()=>{
        if (!useSchedule) calcTotalLog();
        else calcTotalSchedule();
    },[timeOptions, useSchedule]);
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="time-card-name">{name || "Time Sheet"}</div>
            <div className="time-card-header-container">
                <div className="time-card-content">{useSchedule?"Date":"Day"}</div>
                <div className="time-card-content">Hours</div>
                <div className="time-card-content">Start</div>
                <div className="time-card-content">End</div>
            </div>
            <div className="time-card-scroll scrollbar">
                {timeOptions?.map((time, key)=>(
                    <div className="time-card-container" key={key}>
                        <div className="time-card-content">{!useSchedule? tools.time.date(time?.info?.start): tools.time.date(time?.date)}</div>
                        <div className="time-card-content">{!useSchedule? tools.time.subHour(time?.info?.start, time?.info?.end): time?.duration}</div>
                        <div className="time-card-content">{!useSchedule? tools.time.time(time?.info?.start): tools.time.time(time?.date)}</div>
                        <div className="time-card-content">{!useSchedule? tools.time.time(time?.info?.end): tools.time.time(tools.time.addHour(time?.date, time?.duration))}</div>
                        {time?.comment && <div hidden className="float-center time-card-comment hide">{!useSchedule? null: time?.comment}</div>}
                    </div>
                ))}
            </div>
            <div className="time-card-calc-container">
                <div className="time-card-content">Total Hours</div>
                <div className="time-card-content">{totalHours}</div>
                <div className="time-card-content" style={{width:"100%",textAlign:"center"}}>
                    <button hidden className="btn btn-hover" >Options</button>
                </div>
            </div>
        </Modal>
    )
}