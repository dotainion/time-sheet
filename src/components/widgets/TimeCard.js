import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../../container/Modal';
import { getUsers } from '../../database/accounts/AccountsDb';
import { getLogs, getLogsRange } from '../../database/logs/LogDb';
import { useAuth } from '../../state/auth/Authentication';
import { tools } from '../../utils/tools/Tools';
import { IconButton } from './IconButon';
import { IconSelect } from './IconSelect';
import { Calendar } from '../../apps/calendar/Calendar';
import { IoMdOptions } from 'react-icons/io';
import { downloadXlFile } from '../../files/ExcelFile';
import { BiRefresh } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { adminRoutes } from '../../utils/routes/Routes';
import { NoRecord } from './NoRecord';
import { ADMIN_SUPERVISER } from '../../contents/AuthValue';
import { IconCheckbox } from './IconCheckbox';
import defaultImage from '../../images/default-profile-image.png';
import { WidgetsInfo } from './WidgetsInfo';
import { LoadingBar } from './LoadingBar';
import { getSchedule } from '../../database/schedules/SchedulesDb';


const NO_RECORD_INFO = "You can query records between two date range by clicking on the calendar icon to the top right,";
const NO_RECORD_SUB_INFO = "then select from the list of users next to the calendar icon to display log";

let userArray = [];
export const TimeCard = ({isOpen, onClose, header, useSchedule}) =>{
    const history = useHistory();

    const { user } = useAuth();

    const [totalHours, setTotalHours] = useState("0");
    const [users, setUsers] = useState([]);
    const [logs, setLogs] = useState([]);
    const [showCalendarTo, setShowCalendarTo] = useState(false);
    const [showCalendarFrom, setShowCalendarFrom] = useState(false);
    const [hideBtnOption, setHideBtnOption] = useState("");
    const [loading, setLoading] = useState(false);

    const selectedToDate = useRef();
    const selectedFromDate = useRef();
    const userSelectedId = useRef();

    const getALog = async(id) =>{
        return await getLogsRange( selectedFromDate.current, selectedToDate.current, id);
    }

    const pullUserById = (id) =>{
        for (let uUser of userArray){
            if (uUser?.id === id) return uUser;
        }
    }

    const calcTotalLog = () =>{
        let subTime = null;
        for (let log of logs){
            if (log?.info?.start && log?.info?.end){
                const tTime = tools.time.subTimeReturnObj(log?.info?.end, log?.info?.start);
                subTime = tools.time.addTimeReturnObj(subTime?.date, tTime?.date);
            }
        }
        setTotalHours(subTime?.dateString);
    }

    const calcTotalSchedule = () =>{
        let duration = 0;
        for (let time of logs){
            if (time?.duration){
                duration = duration + parseInt(time?.duration);
            }
        }
        setTotalHours(duration);
    }

    const objectizeUser = (obj) =>{
        return {
            id: obj?.id, 
            role: obj?.info?.role, 
            email: obj?.info?.email,
            firstName: obj?.info?.firstName,
            lastName: obj?.info?.lastName,
        }
    }

    const handleOnUsersSelect = async(id = null) =>{
        if (!loading){
            setLoading(true);
            let uLogs = [];
            let holdIds = [];
            for (let uUser of userArray){
                if (id && id === uUser?.id){
                    userSelectedId.current = id;
                    uLogs.push(objectizeUser(uUser));
                    uLogs.push(...await getALog(uUser?.id));
                    break;
                }else{
                    const obj = objectizeUser(uUser);
                    if (!holdIds.includes(obj.id)){
                        uLogs.push(obj);
                        holdIds.push(obj.id);
                    }
                    uLogs.push(...await getALog(uUser?.id));
                }
            };
            setLogs(uLogs);
            setLoading(false);
        }
    }

    const buildDataForExcelFile = (fileName="untitled") =>{
        let holdLogs = [{fileName}];
        for (let log of logs){
            if (log?.firstName || log?.lastName){
                holdLogs.push({
                    id: log?.id,
                    firstName: log?.firstName,
                    lastName: log?.lastName,
                    role: log?.role,
                    email: log?.email
                });
            }else{
                holdLogs.push({startTime:log?.info?.start, endTime:log?.info?.end});
            }
        }
        return holdLogs;
    }

    const onDownloadFile = () =>{
        if (ADMIN_SUPERVISER.includes(user?.role)){
            downloadXlFile(buildDataForExcelFile("time-sheet"));
        }
    }

    const initUsers = async() =>{
        let tempArray = [];
        userArray = [];
        for (let mebr of await getUsers(user?.accessId, user?.id)){
            userArray.push(mebr);
            tempArray.push({
                title: `${mebr?.info?.firstName} ${mebr?.info?.lastName}`,
                value: mebr?.id,
                command: (id) => handleOnUsersSelect(id)
            });
        }
        setUsers(tempArray);
    }

    const initLogs = async() =>{
        setLogs(await getLogs(user?.id));
    }

    const initSchedule = async() =>{
        const sched = await getSchedule(user?.id);
        setLogs(tools.buildScheduleForUi(sched));
    }

    const toggleBtnOption = () =>{
        if (hideBtnOption) setHideBtnOption("");
        else setHideBtnOption("hide-switch");
    }

    const toggleShowIcon = (id, state) =>{
        document.getElementById(id).hidden = state;
    }

    useEffect(()=>{
        if (useSchedule) calcTotalSchedule();
        else calcTotalLog(); 
    },[logs, useSchedule]);

    useEffect(()=>{
        if (ADMIN_SUPERVISER.includes(user?.role)){
            initUsers();
        }else{
            if (useSchedule) initSchedule();
            else initLogs();
        }
    },[]);

    return(
        <div className="time-sheet-mains">
            <div className="time-card-name relative">
                <label>{header || "Time Sheet"} <span style={{color:"white",fontSize:"13px"}}><b>{!useSchedule || user?.firstName + " " + user?.lastName}</b></span></label>
                <IoMdOptions onClick={toggleBtnOption} className="float-top-right hide-on-desktop" style={{top:"5px",right:"5px",display:useSchedule && "none"}} />
                <div className={`float-top-right time-card-buttons-container ${hideBtnOption}`} style={{display:useSchedule && "none"  || !ADMIN_SUPERVISER.includes(user?.role) && "none",zIndex:"9"}}>
                    <div className="float-top-left no-wrap hide-on-desktop" style={{fontSize:"10px",left:"5px"}}>
                        <div>{tools.time.date(selectedFromDate.current)}</div>
                        <div>{tools.time.date(selectedToDate.current)}</div>
                    </div>
                    <div className="inline-block relative hide-on-mobile" style={{fontSize:"13px",backgroundColor:"var(--border-focus)"}}>
                        <div className="no-wrap" style={{color:"navy"}}>
                            <div className="block">From: <b>{tools.time.date(selectedFromDate.current)}</b></div>
                            <div className="block">To: <b>{tools.time.date(selectedToDate.current)}</b></div>
                        </div>
                    </div>
                    <IoMdOptions onClick={toggleBtnOption} className="float-top-right hide-on-desktop" style={{top:"5px",right:"5px"}} />
                    <IconButton onClick={()=>setShowCalendarFrom(true)} cssClass="time-card-buttons btn" icon="calendar" label="Calendar" info="Select date from calendar" />
                    <IconButton onClick={handleOnUsersSelect} cssClass="time-card-buttons btn" icon="users" label="All" info="Select log for all users" />
                    <IconSelect cssClass="time-card-buttons btn" icon="user" options={users} defaultValue="users" info="Select a user" />
                    <IconButton onClick={onDownloadFile} cssClass="time-card-buttons btn" icon="download" label="Export" disabled={!logs.length} info="Download logs" />
                </div>
            </div>
            <div className="time-card-header-container">
                <div className="time-card-content">{useSchedule?"Date":"Day"}</div>
                <div className="time-card-content">Hours</div>
                <div className="time-card-content">Start</div>
                <div className="time-card-content relative">
                    <span>End</span>
                    <div 
                        className="float-right" 
                        style={{
                            right:"20px",
                            fontSize:"25px",
                            display:!ADMIN_SUPERVISER.includes(user?.role) && "none"
                        }}
                    >
                        <WidgetsInfo info="Refresh search">
                            <BiRefresh
                                className={`icon-hover ${loading && "spin"}`} 
                                style={{
                                    borderRadius:"50%",
                                    cursor:"pointer"
                                }}
                                onClick={()=>handleOnUsersSelect(userSelectedId.currentd)}
                            />
                        </WidgetsInfo>
                    </div>
                </div>
            </div>
            <div className="time-card-scroll no-select">
                {
                    logs?.length?
                    logs?.map((time, key)=>(
                        <div key={key}>{
                            time?.firstName || time?.lastName?
                            <div 
                                className="time-card-container relative item-hover" 
                                style={{color:"orange",background:"inherit",cursor:"default"}}
                            >
                                <div className="time-card-content no-wrap relative" style={{color:"orange"}}>
                                    <div className="float-left" style={{left:"5px",top:"55%"}}>
                                        <img src={user?.image || defaultImage} style={{width:"35px",height:"35px",borderRadius:"50%"}} alt="" />
                                    </div>
                                    <label style={{marginLeft:"40px"}}>Name:</label>
                                </div>
                                <div className="time-card-content no-wrap" style={{color:"orange"}}>{`${time?.firstName} ${time?.lastName}`}</div>
                                <div className="time-card-content"/>
                                <div className="time-card-content"/>
                            </div>
                            :
                            <div 
                                onMouseEnter={()=>toggleShowIcon(`time-card${key}`, false)} 
                                onMouseLeave={()=>toggleShowIcon(`time-card${key}`, true)} 
                                className="time-card-container relative item-hover" 
                            >
                                <div className="time-card-content">{!useSchedule? tools.time.date(time?.info?.start): time?.date}</div>
                                <div className="time-card-content">{!useSchedule? tools.time.subTimeReturnObj(time?.info?.end, time?.info?.start).dateString: time?.hours}</div>
                                <div className="time-card-content">{!useSchedule? tools.time.time(time?.info?.start): time?.startTime}</div>
                                <div className="time-card-content">{!useSchedule? tools.time.time(time?.info?.end): time?.endTime}</div>
                                {time?.info && time?.info?.startTime && <div hidden className="float-center time-card-comment hide">{!useSchedule? null: time?.info}</div>}
                                <div hidden className="float-right" style={{right:"40px",fontSize:"20px"}} id={`time-card${key}`}>
                                    <WidgetsInfo info="Send notification to this user">
                                        <IoMdNotificationsOutline
                                            style={{display:!ADMIN_SUPERVISER.includes(user?.role) && "none"}}
                                            onClick={()=>{
                                                history.push({
                                                    pathname: adminRoutes.notification,
                                                    data: {
                                                        type: adminRoutes.logs,
                                                        user: pullUserById(time?.info?.id),
                                                        value: !useSchedule? time?.info?.start: time?.date
                                                    }
                                                });
                                            }}
                                        />
                                    </WidgetsInfo>
                                </div>
                            </div>
                        }</div>
                    )):
                    <NoRecord message={NO_RECORD_INFO} subMessage={NO_RECORD_SUB_INFO} />
                }
            </div>
            <div className="time-card-calc-container">
                <div className="time-card-content">Total Hours</div>
                <div className="time-card-content">{totalHours?.replace?.("AM","")?.replace?.("PM","")}</div>
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
            <LoadingBar isOpen={loading} />
        </div>
    )
}