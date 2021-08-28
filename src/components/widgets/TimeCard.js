import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../../container/Modal';
import { getUsers } from '../../database/accounts/AccountsDb';
import { getLogsRange } from '../../database/logs/LogDb';
import { useAuth } from '../../state/auth/Authentication';
import { tools } from '../../utils/tools/Tools';
import { IconButton } from './IconButon';
import { IconSelect } from './IconSelect';
import { Calendar } from '../../apps/calendar/Calendar';
import { IoMdOptions } from 'react-icons/io';
import { downloadXlFile } from '../../files/ExcelFile';


let userArray = [];
export const TimeCard = ({isOpen, onClose, timeOptions, useSchedule}) =>{
    const { user } = useAuth();

    const [totalHours, setTotalHours] = useState();
    const [users, setUsers] = useState([]);
    const [userNameSelected, setUserNameSelected] = useState("");
    const [logs, setLogs] = useState([]);
    const [showCalendarTo, setShowCalendarTo] = useState(false);
    const [showCalendarFrom, setShowCalendarFrom] = useState(false);
    const [hideBtnOption, setHideBtnOption] = useState("");

    const selectedToDate = useRef();
    const selectedFromDate = useRef();
    const userSelected = useRef();

    const options = [
        {title:"test", command:()=>{alert("hello world")}}
    ]

    const handleOnUserSelect = async(id) =>{
        for (let u of userArray){
            if (u?.id === id){
                userSelected.current = u;
                setUserNameSelected(`${u?.info?.firstName} ${u?.info?.lastName}`);
                setLogs(
                    await getLogsRange(
                        selectedFromDate.current,
                        selectedToDate.current,
                        id
                    )
                );
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

    const buildData = () =>{
        let holdLogs = [];
        for (let log of logs){
            holdLogs.push({
                startTime:log?.info?.start,
                endTime:log?.info?.end
            });
        }
        return holdLogs;
    }

    const onDownloadFile = () =>{
        if (userSelected.current){
            downloadXlFile(
                buildData(),
                {
                    id: userSelected.current?.id,
                    firstName: userSelected.current?.info?.firstName,
                    lastName: userSelected.current?.info?.lastName,
                    role: userSelected.current?.info?.role,
                    email: userSelected.current?.info?.email
                },
                "time-sheet"
            );
        };
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
            <div className="time-card-name relative" style={{zIndex:"999999"}}>
                <label>Time Sheet <span style={{color:"white",fontSize:"13px"}}><b>{!useSchedule? userNameSelected: user?.firstName + " " + user?.lastName}</b></span></label>
                <IoMdOptions onClick={toggleBtnOption} className="float-top-right hide-on-desktop" style={{top:"5px",right:"5px",display:useSchedule && "none"}} />
                <div className={`float-top-right time-card-buttons-container ${hideBtnOption}`} style={{display:useSchedule && "none"}}>
                    <div className="float-top-left no-wrap hide-on-desktop" style={{fontSize:"10px",left:"5px"}}>
                        <div>{tools.time.date(selectedFromDate.current)}</div>
                        <div>{tools.time.date(selectedToDate.current)}</div>
                    </div>
                    <div className="inline-block relative hide-on-mobile" style={{fontSize:"11px"}}>
                        <div className="float-right no-wrap" style={{top:"-5px"}}>
                            <label className="block">From: <b>{tools.time.date(selectedFromDate.current)}</b></label>
                            <label className="block">To: <b>{tools.time.date(selectedToDate.current)}</b></label>
                        </div>
                    </div>
                    <IoMdOptions onClick={toggleBtnOption} className="float-top-right hide-on-desktop" style={{top:"5px",right:"5px"}} />
                    <IconButton onClick={()=>setShowCalendarFrom(true)} cssClass="time-card-buttons" icon="calendar" label="Calendar" />
                    <IconSelect cssClass="time-card-buttons" icon="people" options={users} defaultValue="Users" />
                    <IconButton onClick={onDownloadFile} cssClass="time-card-buttons" icon="download" label="Export" />
                    <span hidden><IconSelect cssClass="time-card-buttons" icon="settings" options={options} defaultValue="Options" /></span>
                </div>
            </div>
            <div className="time-card-header-container">
                <div className="time-card-content">{useSchedule?"Date":"Day"}</div>
                <div className="time-card-content">Hours</div>
                <div className="time-card-content">Start</div>
                <div className="time-card-content">End</div>
            </div>
            <div className="time-card-scroll no-select scrollbar">
                {logs?.map((time, key)=>(
                    <div className="time-card-container item-hover" key={key}>
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
                header="Search From"
                headerStyle={{
                    backgroundColor:"blue",
                    color:"white",
                    paddingLeft:"5px"
                }}
                isOpen={showCalendarFrom}
                onClose={()=>{
                    setShowCalendarFrom(false);
                    setShowCalendarTo(true);
                }} 
                onSelect={(date)=>selectedFromDate.current = date} 
            />
            <Calendar 
                closeOnSelect
                header="Search To"
                headerStyle={{
                    backgroundColor:"green",
                    color:"white",
                    paddingLeft:"5px"
                }}
                isOpen={showCalendarTo}
                onClose={()=>setShowCalendarTo(false)} 
                onSelect={(date)=>selectedToDate.current = date} 
            />
        </Modal>
    )
}