import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '../../components/widgets/IconButon';
import { NoRecord } from '../../components/widgets/NoRecord';
import { useAuth } from '../../state/auth/Authentication';
import { getLogsRange } from '../../database/logs/LogDb';
import { DateEntry } from '../../components/widgets/DateEntry';
import { LoadingBar } from '../../components/widgets/LoadingBar';
import { time } from '../../utils/time/Time';
import { UserNavBar } from '../../container/UserNavBar';
import { OptionsMenu } from '../../private/admin/other/OptionsMenu';
import { MdDateRange } from 'react-icons/md';
import { WiTime2, WiTime8 } from 'react-icons/wi';
import { IoMdInformationCircleOutline} from 'react-icons/io';
import { GiCoffeeCup } from 'react-icons/gi';
import { TimePicker } from '../../components/widgets/TimePicker';
import { InputTextarea } from '../../components/widgets/InputTextarea';
import $ from 'jquery';
import { useStore } from '../../state/stateManagement/stateManagement';
import { addRequestChange } from '../../database/requests/TimeChange';


export const Logs = () =>{
    const { user } = useAuth();
    const { setLoader } = useStore();

    const [logs, setLogs] = useState([]);
    const [requestsData, setRequestsData] = useState(null);
    const [pageMinHeight, setPageMinHeight] = useState(false);
    const [toError, setToError] = useState("");
    const [fromError, setFromError] = useState("");
    const [reasonError, setReasonError] = useState("");

    const toDateRef = useRef();
    const fromDateRef = useRef();
    const requestContainerRef = useRef();
    const requestToRef = useRef();
    const requestFromRef = useRef();
    const reasonRef = useRef();

    const searchLogsByDateRange = async() =>{
        setLoader(true);
        const from = fromDateRef.current.valueAsDate;
        const to = toDateRef.current.valueAsDate;
        setLogs(await getLogsRange(from, to, user?.id));
        setLoader(false);
    }

    const onReqeust = async() =>{
        let STATE = true;
        if (!reasonRef.current.value){
            STATE = false;
            setReasonError("You must provid a valid reason");
        }
        if (!requestFromRef.current.valueAsDate){
            STATE = false;
            setFromError("Invalid Time");
        }
        if (!requestToRef.current.valueAsDate){
            STATE = false;
            setToError("Invalid Time");
        }
        if (!Object.keys(requestsData || {}).length){
            STATE = false;
            alert("No log was selected");
        }

        if (!STATE) return;

        setLoader(true);
        await addRequestChange({
            userId: user?.id,
            supervisorId: user?.supervisorId,
            accepted: "none",
            log: {
                logId: requestsData?.id,
                start: requestsData?.info?.start,
                end: requestsData?.info?.end
            },
            request: {
                start: time.toDigits(requestFromRef.current.valueAsDate),
                end: time.toDigits(requestToRef.current.valueAsDate),
                reason: reasonRef.current.value
            }
        });
        setRequestsData(null);
        setLoader(false);
    }
  
    useEffect(()=>{
        let fromD = new Date();
        fromD.setDate(fromD.getDate() - 30);
        fromDateRef.current.valueAsDate = fromD;
        toDateRef.current.valueAsDate = new Date();
        searchLogsByDateRange();
    }, []);

    useEffect(()=>{
        if (requestsData){
            setPageMinHeight(true);
            $(requestContainerRef.current).slideDown("slow");
        }else{
            $(requestContainerRef.current).slideUp("slow");
            setTimeout(() => {
                setToError("");
                setFromError("");
                setReasonError("");
                setPageMinHeight(false);
                requestToRef.current.valueAsDate = null;
                requestFromRef.current.valueAsDate = null;
                reasonRef.current.value = "";
            }, 1000);
        }
    }, [requestsData]);

    return(
        <UserNavBar>
            <div className="no-select">
                <div className="max-width" style={{paddingTop:"40px"}}>
                    <div className="flex">
                        <div className="pad">
                            <label style={{marginRight:"5px"}}>From</label>
                            <DateEntry inputRef={fromDateRef} />
                        </div>
                        <div className="pad">
                            <label style={{marginRight:"5px"}}>To</label>
                            <DateEntry inputRef={toDateRef} />
                        </div>
                        <div style={{padding:"13px"}}>
                            <IconButton onClick={searchLogsByDateRange} label="Search" cssClass="pad-mini" icon="log" />
                        </div>
                    </div>
                    
                    <div ref={requestContainerRef} className="relative hide">
                        <div className="log-request-container">
                            <div className="flex d-flex-on-mobile pad centered">
                                <div className="max-width relative" style={{minWidth:"180px"}}>
                                    <div className="float-left no-float-on-mobile">
                                        <b>Current record</b>
                                        <div className="flex flex pad-mini">
                                            <div className="max-width">Start:</div> 
                                            {time.toTimeString(requestsData?.info?.start)}
                                        </div>
                                        <div className="flex flex pad-mini">
                                            <div className="max-width">End:</div>
                                            {time.toTimeString(requestsData?.info?.end)}
                                        </div>
                                    </div>
                                </div>
                                <div className="max-width relative" style={{minWidth:"180px"}}>
                                    <div className="float-left no-float-on-mobile">
                                        <b>Add time requesting</b>
                                        <div className="flex pad">
                                            <div className="max-width" style={{paddingRight:"5px"}}>From</div>
                                            <TimePicker inputRef={requestFromRef} error={fromError} clearError={()=>setFromError("")} />
                                        </div>
                                        <div className="flex pad">
                                            <div className="max-width" style={{paddingRight:"5px"}}>to</div>
                                            <TimePicker inputRef={requestToRef} error={toError} clearError={()=>setToError("")} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <InputTextarea inputRef={reasonRef} inputStyle={{width:"300px"}} placeholder="Enter a reason for your request" error={reasonError} errorReset={()=>setReasonError("")} />
                                    <div className="flex">
                                        <IconButton onClick={()=>setRequestsData(null)} label="CLOSE" icon="close" style={{marginRight:"10px"}}  info="Cancel Request" />
                                        <IconButton onClick={onReqeust} label="REQUEST" icon="send" info="Send Request" />
                                    </div>
                                </div>
                            </div>
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
                        <div className="log-record-scroller" style={{height:pageMinHeight && "55vh"}}>
                            {
                                logs.length?
                                logs.map((log, key)=>(
                                    <div key={key}>
                                        {
                                            <div className="log-record">
                                                <div>{time.toDateString(log?.info?.start)}</div>
                                                <div>{time.toTimeString(log?.info?.start)}</div>
                                                <div>{time.toTimeString(log?.info?.end)}</div>
                                                <div>{time.sub(log?.info?.end, log?.info?.start, true)}</div>
                                                <OptionsMenu options={log?.info?.break || []} borderInherit onRequests={()=>setRequestsData(log)} />
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
        </UserNavBar>
    )
}

