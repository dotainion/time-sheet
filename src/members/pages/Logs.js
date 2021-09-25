import React, { useEffect, useRef, useState } from 'react';
import { AdminNavBar } from '../../container/AdminNavBar';
import { Button } from '../../components/widgets/Buttons';
import { IconButton } from '../../components/widgets/IconButon';
import { InputCheckbox } from '../../components/widgets/InputCheckbox';
import { NoRecord } from '../../components/widgets/NoRecord';
import { SearchBar } from '../../components/widgets/SearchBar';
import { WidgetsInfo } from '../../components/widgets/WidgetsInfo';
import { getUsers } from '../../database/accounts/AccountsDb';
import { xlFile } from '../../files/ExcelFile';
import { useAuth } from '../../state/auth/Authentication';
import { getLogsRange, updateLog } from '../../database/logs/LogDb';
import { DateEntry } from '../../components/widgets/DateEntry';
import defaultImage from '../../images/default-profile-image.png';
import { LoadingBar } from '../../components/widgets/LoadingBar';
import { time } from '../../utils/time/Time';
import $ from 'jquery';
import { HiDotsVertical } from 'react-icons/hi';
import { OptionsMenu } from '../../components/widgets/OptionsMenu';
import { useStore } from '../../state/stateManagement/stateManagement';
import { TimePicker } from '../../components/widgets/TimePicker';
import { UserNavBar } from '../../container/UserNavBar';



export const Logs = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const toDateFrom = useRef();
    const fromDateRef = useRef();

    const searchLogsByDateRange = async() =>{
        setLoading(true);
        const from = fromDateRef.current.valueAsDate;
        const to = toDateFrom.current.valueAsDate
        setLogs(await getLogsRange(from, to, user?.id));
        setLoading(false);
    }
  
    useEffect(()=>{
        let fromD = new Date();
        fromD.setDate(fromD.getDate() - 30);
        fromDateRef.current.valueAsDate = fromD;
        toDateFrom.current.valueAsDate = new Date();
        searchLogsByDateRange();
    }, []);

    return(
        <UserNavBar>
            <div className="no-select">
                <div className="max-width" style={{marginTop:"40px"}}>
                    <div className="flex">
                        <div className="pad">
                            <label style={{marginRight:"5px"}}>From</label>
                            <DateEntry inputRef={fromDateRef} />
                        </div>
                        <div className="pad">
                            <label style={{marginRight:"5px"}}>To</label>
                            <DateEntry inputRef={toDateFrom} />
                        </div>
                        <div style={{padding:"13px"}}>
                            <IconButton onClick={searchLogsByDateRange} label="Search" cssClass="pad-mini" icon="log" />
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
                                            <div className="log-record">
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
            <LoadingBar isOpen={loading} />
        </UserNavBar>
    )
}

