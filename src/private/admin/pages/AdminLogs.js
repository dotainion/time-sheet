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
import { EllipsisMenu } from '../../../components/widgets/EllipsisMenu';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { TimePicker } from '../../../components/widgets/TimePicker';
import { UpdateLog } from '../other/UpdateLog';
import { OptionsMenu } from '../other/OptionsMenu';
import { UsersListContainer } from '../other/UsersListContainer';
import { MdDateRange } from 'react-icons/md';
import { WiTime2, WiTime8 } from 'react-icons/wi';
import { IoMdInformationCircleOutline} from 'react-icons/io';
import { GiCoffeeCup } from 'react-icons/gi';
import { Backdrop } from '../../../container/Backdrop';
import { RequestsAction } from '../other/RequestsActions';



export const AdminLogs = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);
    const [allowEditing, setAllowEditing] = useState(false);
    const [showEditLog, setShowEditLog] = useState({state:false, date:null});
    const [isUserSelected, setIsUserSelected] = useState(false);

    const toDateFrom = useRef();
    const fromDateRef = useRef();
    const singleUserSelectedRef = useRef();

    const getByRange = async(id) =>{
        const from = fromDateRef.current.valueAsDate;
        const to = toDateFrom.current.valueAsDate
        return await getLogsRange(from, to, id);
    }

    const getSingleSelectedUserLog = async(uUser) =>{
        singleUserSelectedRef.current = uUser;
        setLogs([uUser, ...await getByRange(uUser?.id)]);
    }

    const onMultiSelected = async(users) =>{
        let multiUserlogs = [];
        for (let multiUser of users || []){
            const mLogs = await getByRange(multiUser?.id);
            multiUserlogs.push(multiUser);
            for (let gs of mLogs) multiUserlogs.push(gs);
        }
        setLogs(multiUserlogs);
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

    useEffect(()=>{
        let fromD = new Date();
        fromD.setDate(fromD.getDate() - 30);
        fromDateRef.current.valueAsDate = fromD;
        toDateFrom.current.valueAsDate = new Date();
    }, []);

    return(
        <AdminNavBar useContact>
            <UsersListContainer
                useRefresh
                refreshId="admin-log-refresh"
                onChecked={setIsUserSelected}
                onSelected={getSingleSelectedUserLog}
                onMultiSelected={onMultiSelected}
                toolbar={[{title:"Export",icon:"download",disabled:!logs.length,action:onDownloadFile},{title:"Editing is on...",style:{color:"red"},border:"none",hidden:!allowEditing}]}
                menu={!logs.length?null:[{title:allowEditing?"Disable editing":"Enable editing",action:()=>setAllowEditing(!allowEditing)}]}
            >

                <div className="flex pad">
                    <div className="pad">
                        <label style={{marginRight:"5px"}}>From</label>
                        <DateEntry inputRef={fromDateRef} />
                    </div>
                    <div className="pad">
                        <label style={{marginRight:"5px"}}>To</label>
                        <DateEntry inputRef={toDateFrom} />
                    </div>
                    <div hidden={!isUserSelected} style={{padding:"13px"}}>
                        <Button onClick={()=>document.getElementById("admin-log-refresh").click()} label="Get selected" icon="users" />
                    </div>
                </div>

                <div className="pad">
                    <div className="log-record" style={{marginRight:"17px"}}>
                        <div><b>Date</b><MdDateRange style={{paddingLeft:"5px"}} /></div>
                        <div><b>Start</b><WiTime2 style={{paddingLeft:"5px"}} /></div>
                        <div><b>End</b><WiTime8 style={{paddingLeft:"5px"}} /></div>
                        <div><b>Total Hours</b><IoMdInformationCircleOutline style={{paddingLeft:"5px"}} /></div>
                        <div><b>Total Break</b><GiCoffeeCup style={{paddingLeft:"5px"}} /></div>
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
                                            <div>{time.toDateString(log?.info?.start)}</div>
                                            <div>{time.toTimeString(log?.info?.start)}</div>
                                            <div>{time.toTimeString(log?.info?.end)}</div>
                                            <div>{time.sub(log?.info?.end, log?.info?.start, true)}</div>
                                            <OptionsMenu options={log?.info?.break || []} />
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
            </UsersListContainer>
            <UpdateLog 
                isOpen={showEditLog.state}
                data={showEditLog.date}
                onUpdated//={onRefresh}
                onClose={()=>setShowEditLog({state:false, date:null})}
            />
        </AdminNavBar>
    )
}

