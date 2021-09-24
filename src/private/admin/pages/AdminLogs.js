import React, { useEffect, useRef, useState } from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { Button } from '../../../components/widgets/Buttons';
import { IconButton } from '../../../components/widgets/IconButon';
import { InputCheckbox } from '../../../components/widgets/InputCheckbox';
import { NoRecord } from '../../../components/widgets/NoRecord';
import { SearchBar } from '../../../components/widgets/SearchBar';
import { WidgetsInfo } from '../../../components/widgets/WidgetsInfo';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { xlFile } from '../../../files/ExcelFile';
import { useAuth } from '../../../state/auth/Authentication';
import { getLogsRange, updateLog } from '../../../database/logs/LogDb';
import { DateEntry } from '../../../components/widgets/DateEntry';
import defaultImage from '../../../images/default-profile-image.png';
import { LoadingBar } from '../../../components/widgets/LoadingBar';
import { time } from '../../../utils/time/Time';
import $ from 'jquery';
import { HiDotsVertical } from 'react-icons/hi';
import { OptionsMenu } from '../../../components/widgets/OptionsMenu';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { TimePicker } from '../../../components/widgets/TimePicker';
import { UpdateLog } from '../other/UpdateLog';


let muliUserIds = [];
let checkboxIds = [];
export const AdminLogs = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [multipleUsers, setMultipleUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [allowEditing, setAllowEditing] = useState(false);
    const [showEditLog, setShowEditLog] = useState({state:false, date:null});

    const toDateFrom = useRef();
    const fromDateRef = useRef();
    const containerRef = useRef();
    const singleUserSelectedRef = useRef();

    const getByRange = async(id) =>{
        const from = fromDateRef.current.valueAsDate;
        const to = toDateFrom.current.valueAsDate
        return await getLogsRange(from, to, id);
    }

    const onMuliUserSelect = (uUser) =>{
        document.getElementById("select-all").checked = false;
        if (muliUserIds.includes(uUser?.id)){
            muliUserIds = [];
            let tempMulti = [];
            for (let usr of multipleUsers){
                if (usr?.id !== uUser?.id){
                    tempMulti.push(usr);
                    muliUserIds.push(usr?.id);
                }
            }
            setMultipleUsers(tempMulti);
        }else{
            muliUserIds.push(uUser?.id);
            setMultipleUsers([...multipleUsers, uUser]);
        }
    }

    const getSingleSelectedUserLog = async(uUser) =>{
        if (multipleUsers.length) return;
        setLoading(true);
        singleUserSelectedRef.current = uUser;
        setLogs([uUser, ...await getByRange(uUser?.id)]);
        setLoading(false);
    }

    const getMultiSelectedUserLog = async() =>{
        setLoading(true);
        let multiUserlogs = [];
        for (let multiUser of multipleUsers){
            const mLogs = await getByRange(multiUser?.id);
            multiUserlogs.push(multiUser);
            for (let gs of mLogs){
                multiUserlogs.push(gs);
            }
        }
        setLogs(multiUserlogs);
        setLoading(false);
    }

    const onRefresh = () =>{
        if (multipleUsers.length){
            getMultiSelectedUserLog();
        }else{
            if (!singleUserSelectedRef.current?.id) return;
            const uUser = singleUserSelectedRef.current;
            getSingleSelectedUserLog(uUser);
        }
    }

    const buildXlData = () =>{
        let holdLogs = [];
        for (let log of logs){
            if (log?.info?.firstName || log?.info?.lastName){
                holdLogs.push(
                    {
                        id: log?.id,
                        firstName: log?.info?.firstName,
                        lastName: log?.info?.lastName,
                        role: log?.info?.role,
                        email: log?.info?.email
                    }
                );
            }else{
                holdLogs.push(
                    {
                        startTime: log?.info?.start, 
                        endTime: log?.info?.end,
                        break: log?.info?.break
                    }
                );
            }
        }
        return holdLogs;
    }

    const onDownloadFile = () =>{
        xlFile.download(buildXlData());
    }

    const initCheckBoxId = (index) =>{
        const id = `checkbox-unique-id-${index}`;
        checkboxIds.push(id);
        return id;
    }

    const selectAllCheckbox = (checked) =>{
        checkboxIds.forEach((id)=>{
            document.getElementById(id).checked = checked;
        });
        muliUserIds = [];
        if (checked){
            let temps = [];
            for (let usr of users){
                muliUserIds.push(usr?.id);
                temps.push(usr);
            };
            setMultipleUsers(temps);
        }else setMultipleUsers([]);
    }
    
    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }

    useEffect(()=>{
        initUsers();
        let fromD = new Date();
        fromD.setDate(fromD.getDate() - 30);
        fromDateRef.current.valueAsDate = fromD;
        toDateFrom.current.valueAsDate = new Date();
    }, []);

    return(
        <AdminNavBar>
            <div className="flex no-select">
                <div className="log-user-container">
                    <SearchBar placeholder="Search users" />
                    <div
                        onMouseEnter={()=>setShowOption(true)} 
                        onMouseLeave={()=>setShowOption(false)} 
                        className="log-user-scroller"
                        ref={containerRef}
                    >
                        <div hidden={!showOption} className="float-top-left log-user-menu">
                            <div className="pad-mini flex">
                                <InputCheckbox onChange={selectAllCheckbox} id="select-all" />
                                <label>Select all</label>
                            </div>
                        </div>
                        {
                            users.length?
                            users.map((usr, key)=>(
                                <WidgetsInfo onClick={()=>getSingleSelectedUserLog(usr)} cssClass="log-user" info="some msg" key={key}>
                                    <div className="flex">
                                        <InputCheckbox onChange={()=>onMuliUserSelect(usr)} stopPropagation id={initCheckBoxId(key)} />
                                        <img src={usr?.info?.image || defaultImage} className="log-img" />
                                        <div>{usr?.info?.firstName} {usr?.info?.lastName}</div>
                                    </div>
                                </WidgetsInfo>
                            )):
                            <div>No users</div>
                        }
                    </div>
                </div>
                <div className="max-width">
                    <div className="" style={{borderBottom:"1px solid gray"}}>
                        <div className="inline-block pad-mini">
                            <IconButton onClick={onRefresh} label="Refresh" icon="refresh" cssClass="log-header-btn-text" iconCss="float-left log-header-btn-icon" />
                        </div>
                        <div className="inline-block pad-mini">
                            <IconButton onClick={onDownloadFile} disabled={!logs.length} label="Export" icon="download" cssClass="log-header-btn-text" iconCss="float-left log-header-btn-icon" />
                        </div>
                        <div className="inline-block pad-mini">
                            <div style={{color:"red"}}><b>{allowEditing && "Editing is on..."}</b></div>
                        </div>
                        <OptionsMenu options={[{title: allowEditing?"Disable editing":"Enable editing", action: ()=>setAllowEditing(!allowEditing), state: allowEditing}]} />
                    </div>

                    <div className="pad">
                        <div className="flex">
                            <div className="pad">
                                <label style={{marginRight:"5px"}}>From</label>
                                <DateEntry inputRef={fromDateRef} />
                            </div>
                            <div className="pad">
                                <label style={{marginRight:"5px"}}>To</label>
                                <DateEntry inputRef={toDateFrom} />
                            </div>
                            <div hidden={!multipleUsers.length} style={{padding:"13px"}}>
                                <Button onClick={getMultiSelectedUserLog} label="Get selected" icon="users" />
                            </div>
                        </div>
                        
                        <div className="pad">
                            <div className="log-record" style={{marginRight:"17px"}}>
                                <div><b>Date</b></div>
                                <div><b>Start</b></div>
                                <div><b>End</b></div>
                                <div><b>Total Hours</b></div>
                                <div><b>Total Break</b></div>
                            </div>
                            <div className="log-record-scroller">
                                {
                                    logs.length?
                                    logs.map((log, key)=>(
                                        <div key={key}>
                                            {
                                                log?.info?.firstName || log?.info?.lastName?
                                                <div className="log-record-user" style={{marginTop:key && "20px"}}>
                                                    <img src={log?.info?.image || defaultImage} className="log-img" />
                                                    <div>{log?.info?.firstName} {log?.info?.lastName}</div>
                                                </div>:
                                                <div onClick={()=>allowEditing && setShowEditLog({state:true, date:log})} className={`log-record ${allowEditing && "item-hover"}`} style={{cursor:allowEditing && "pointer"}}>
                                                    <div className="relative">{time.toDateString(log?.info?.start)}</div>
                                                    <div className="relative">{time.toTimeString(log?.info?.start)}</div>
                                                    <div className="relative">{time.toTimeString(log?.info?.end)}</div>
                                                    <div className="relative">{time.sub(log?.info?.end, log?.info?.start, true)}</div>
                                                    <div className="relative">Total Break</div>
                                                </div>
                                            }
                                        </div>
                                    )):
                                    <NoRecord
                                        icon="logs"
                                        header="No logs to show" 
                                        subMessage="No records available"
                                        message=""
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoadingBar isOpen={loading} />
            <UpdateLog 
                isOpen={showEditLog.state}
                data={showEditLog.date}
                onUpdated={onRefresh}
                onClose={()=>setShowEditLog({state:false, date:null})}
            />
        </AdminNavBar>
    )
}

