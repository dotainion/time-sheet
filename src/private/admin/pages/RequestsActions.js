import React, { useEffect, useState, useRef } from 'react';
import { IconButton } from '../../../components/widgets/IconButon';
import { LoadingBar } from '../../../components/widgets/LoadingBar';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { Backdrop } from '../../../container/Backdrop';
import { getUser } from '../../../database/accounts/AccountsDb';
import { updateLog } from '../../../database/logs/LogDb';
import { getRequestChange, updateRequestChange } from '../../../database/requests/TimeChange';
import { useAuth } from '../../../state/auth/Authentication';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { time } from '../../../utils/time/Time';
import { LandingContent } from '../other/LandingContent';
import $ from 'jquery';
import { IconSelect } from '../../../components/widgets/IconSelect';


export const RequestsAction = () =>{
    const { user } = useAuth();
    const { requests, filterRequests, setRequests } = useStore();

    const [loading, setLoading] = useState(null);
    const [logSelected, setLogSelected] = useState(null);

    const landingRef = useRef();
    const acceptPaageRef = useRef();

    const displayAcceptOrDecline = (state) =>{
        let tempLog = [];
        for (let log of requests){
            if (logSelected?.id === log?.id){
                let tempSelect = logSelected;
                tempSelect["info"]["accepted"] = state;
                setLogSelected(tempSelect);
                log["info"]["accepted"] = state;
                tempLog.push(log);
            }else{
                tempLog.push(log);
            }
        }
        setRequests(tempLog);
    }

    const onDecline = async() =>{
        if (!logSelected) return;
        setLoading(true);
        await updateRequestChange({accepted:"decline"}, logSelected?.id);
        displayAcceptOrDecline("Declined");
        setLoading(false);
    }

    const onAccepted = async() =>{
        if (!logSelected) return;
        setLoading(true);
        await updateRequestChange({accepted:"accept"}, logSelected?.id);
        await updateLog({
            start: logSelected?.info?.request?.start, 
            end: logSelected?.info?.request?.start, 
            editedBy: user?.id
        }, logSelected?.info?.log?.logId);
        displayAcceptOrDecline("Accepted");
        setLoading(false);
    }

    const status = (value=null) =>{
        if (["Accepted","accept"].includes(value)) return {color:"green",text:"Accepted"};
        if (["Declined","decline"].includes(value)) return {color:"red",text:"Declined"};
        if (["none"].includes(value)) return {color:"black",text:"Pending"};
        return {color:"black",text:""};
    }

    const isSelected = (id) =>{
        if (id === logSelected?.id) return "lightgray";
        return "";
    }

    const onFilter = async(value) =>{
        setLoading(true);
        let filter = value.target.value;
        if (filter === "Accepted") filter = "accept";
        else if (filter === "Declined") filter = "decline";
        else filter = "none"; //"Pending"
        await filterRequests(filter);
        setLoading(false);
    }

    useEffect(()=>{
        if (logSelected){
            $(landingRef.current).hide("slow");
            $(acceptPaageRef.current).show("slow");
        }else{
            $(landingRef.current).show("slow");
            $(acceptPaageRef.current).hide("slow");
        }
    }, [logSelected]);
    return(
        <AdminNavBar useContact>
            <div className="flex no-select max-width" style={{height:"90vh"}}>
                <div style={{width:"300px",borderRight:"1px solid gray"}}>
                    <div className="header" style={{borderBottom:"1px solid var(--border)"}}>Requests</div>
                    <div className="flex pad">
                        <div style={{paddingRight:"10px"}}>Filter</div>
                        <IconSelect onChange={onFilter} options={[{title:"Pending"},{title:"Accepted"},{title:"Declined"}]} />
                    </div>
                    <div style={{height:"82vh",overflowY:"auto"}}>
                        {
                            requests.length?
                            requests.map((request, key)=>(
                                <div onClick={()=>setLogSelected(request)} className="pad-mini item-c-b-hover" style={{backgroundColor:isSelected(request?.id),borderBottom:"2px solid var(--border)"}} key={key}>
                                    <div className="flex">
                                        <b className="max-width">{request?.info?.user?.firstName} {request?.info?.user?.firstName}</b>
                                        <div style={{color:status(request?.info?.accepted).color}}>{status(request?.info?.accepted).text}</div>
                                    </div>
                                    <div style={{fontSize:"12px",lineHeight:"0.5"}}>{request?.info?.user?.role}</div>
                                </div>
                            )):
                            <div>No Requests</div>
                        }
                    </div>
                </div>

                <div className="relative" style={{width:"81%",overflow:"hidden"}}>
                    <div className="header pad centered" style={{marginTop:"50px",color:"black"}}>Requst Time Change</div>
                    <div ref={acceptPaageRef} className="centered" style={{color:"gray"}}>
                        <div className="pad">User is requsting time change.</div>
                        <div className="pad max-width">
                            <b>Current time</b>
                            <div className="flex max-width">
                                <div className="max-width">Start:</div>
                                <div className="max-width">{time.toTimeString(logSelected?.info?.log?.start)}</div>
                            </div>
                            <div className="flex">
                                <div className="max-width">End:</div>
                                <div className="max-width">{time.toTimeString(logSelected?.info?.log?.end)}</div>
                            </div>
                        </div>
                        <div className="pad max-width">
                            <b>Requested time</b>
                            <div className="flex max-width">
                                <div className="max-width">Start:</div>
                                <div className="max-width">{time.toTimeString(logSelected?.info?.request?.start)}</div>
                            </div>
                            <div className="flex max-width">
                                <div className="max-width">End:</div>
                                <div className="max-width">{time.toTimeString(logSelected?.info?.request?.end)}</div>
                            </div>
                        </div>
                        <div className="pad">
                            <div className="pad-mini" style={{border:"5px solid lightgray",borderRadius:"5px",height:"200px",overflowY:"auto"}}>
                                {logSelected?.info?.request?.reason || "No reason provided"}
                            </div>
                        </div>
                        <div className="flex pad max-width">
                            <IconButton onClick={onDecline} label="Decline" style={{marginRight:"10px",color:"red"}} />
                            <IconButton onClick={onAccepted} label="Accept" style={{color:"green"}} />
                            <div className="max-width" style={{textAlign:"right",paddingRight:"20px",color:status(logSelected?.info?.accepted).color}}>
                                <b>{status(logSelected?.info?.accepted).text}</b>
                            </div>
                        </div>
                    </div>
                    <LandingContent landingRef={landingRef} />
                </div>
            </div>
            <LoadingBar isOpen={loading} />
        </AdminNavBar>
    )
}