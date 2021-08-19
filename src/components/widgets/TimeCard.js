import React, { useEffect, useState } from 'react';
import { Modal } from '../../container/Modal';
import { getUsers } from '../../database/accounts/AccountsDb';
import { getLogsRange } from '../../database/logs/LogDb';
import { useAuth } from '../../state/auth/Authentication';
import { tools } from '../../utils/tools/Tools';
import { IconButton } from './IconButon';
import { IconSelect } from './IconSelect';
import { MdDateRange } from 'react-icons/md';
import { Calendar } from '../../apps/calendar/Calendar';
import { IoMdOptions } from 'react-icons/io';


let userArray = [];
export const TimeCart = ({isOpen, onClose, timeOptions, useSchedule}) =>{
    const { user } = useAuth();

    const [totalHours, setTotalHours] = useState();
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState("");
    const [logs, setLogs] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [hideBtnOption, setHideBtnOption] = useState("");

    const options = [
        {title:"test", command:()=>{alert("hello world")}}
    ]

    const handleOnUserSelect = async(id) =>{
        for (let u of userArray){
            if (u?.id === id){
                setUserSelected(`${u?.info?.firstName} ${u?.info?.lastName}`);
                setLogs(await getLogsRange(selectedDate, tools.time.digits(), id));
            }
        }
    }

    const calcTotalLog = () =>{

    }

    const calcTotalSchedule = () =>{
        let total = 0;
        for (let time of timeOptions || []){
            total = total + parseInt(time?.duration);
        }
        setTotalHours(total);
    }

    const initUsers = async() =>{
        let tempArray = [];
        userArray = [];
        for (let mebr of await getUsers(user?.accessId, user?.id)){
            userArray.push(mebr);
            tempArray.push({
                title: `${mebr?.info?.firstName} ${mebr?.info?.lastName}`,
                value: mebr?.id,
                command: (id) => handleOnUserSelect(id)
            });
        }
        setUsers(tempArray);
    }

    const toggleBtnOption = () =>{
        if (hideBtnOption) setHideBtnOption("");
        else setHideBtnOption("hide-switch");
    }

    useEffect(()=>{
        initUsers();
        if (!useSchedule) calcTotalLog();
        else calcTotalSchedule();
    },[logs, useSchedule]);
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="time-card-name relative">
                <label>Time Sheet <span style={{color:"white",fontSize:"13px"}}><b>{userSelected}</b></span></label>
                    <IoMdOptions onClick={toggleBtnOption} className="float-top-right hide-on-desktop" style={{top:"5px",right:"5px"}} />
                    <div className={`float-top-right time-card-buttons-container ${hideBtnOption}`}>
                        <IoMdOptions onClick={toggleBtnOption} className="float-top-right hide-on-desktop" style={{top:"5px",right:"5px"}} />
                        <IconButton onClick={()=>setShowCalendar(true)} cssClass="time-card-buttons" icon="calendar" label="Calendar" />
                        <IconSelect cssClass="time-card-buttons" icon="people" options={users} defaultValue="Users" />
                        <IconButton cssClass="time-card-buttons" icon="download" label="Export" />
                        <span hidden><IconSelect cssClass="time-card-buttons" icon="settings" options={options} defaultValue="Options" /></span>
                    </div>
            </div>
            <div className="time-card-header-container">
                <div className="time-card-content">{useSchedule?"Date":"Day"}</div>
                <div className="time-card-content">Hours</div>
                <div className="time-card-content">Start</div>
                <div className="time-card-content">End</div>
            </div>
            <div className="time-card-scroll scrollbar">
                {logs?.map((time, key)=>(
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
            <Calendar 
                closeOnSelect
                isOpen={showCalendar}
                onClose={()=>setShowCalendar(false)} 
                onSelect={setSelectedDate} 
            />
        </Modal>
    )
}