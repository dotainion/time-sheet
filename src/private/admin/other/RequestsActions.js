import React, { useEffect, useState } from 'react';
import { IconButton } from '../../../components/widgets/IconButon';
import { LoadingBar } from '../../../components/widgets/LoadingBar';
import { Backdrop } from '../../../container/Backdrop';
import { getUser } from '../../../database/accounts/AccountsDb';
import { updateLog } from '../../../database/logs/LogDb';
import { getRequestChange, updateRequestChange } from '../../../database/requests/TimeChange';
import { useAuth } from '../../../state/auth/Authentication';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { time } from '../../../utils/time/Time';


export const RequestsAction = ({isOpen, onClose}) =>{
    const { user } = useAuth();
    const { requests, setRequests } = useStore();

    const [loading, setLoading] = useState(null);
    const [logSelected, setLogSelected] = useState(null);

    const removeFromList = () =>{
        let tempLog = [];
        for (let log of requests){
            if (logSelected?.id !== log?.id){
                tempLog.push(log);
            }
        }
        setRequests(tempLog);
    }

    const onDecline = async() =>{
        setLoading(true);
        setLogSelected(null);
        await updateRequestChange({accepted:"decline"}, logSelected?.id);
        removeFromList();
        setLoading(false);
    }

    const onAccepted = async() =>{
        setLoading(true);
        setLogSelected(null);
        await updateRequestChange({accepted:"accept"}, logSelected?.id);
        await updateLog({
            start: logSelected?.info?.request?.start, 
            end: logSelected?.info?.request?.start, 
            editedBy: user?.id
        }, logSelected?.info?.log?.logId);
        removeFromList();
        setLoading(false);
    }

    const initRequests = async() =>{
        let response = await getRequestChange(user?.id);
        let request = [];
        for (let record of response){
            const usr = await getUser(record?.info?.userId);
            record["info"]["user"] = usr;
            request.push(record);
        };
        setRequests(request);
    }

    useEffect(()=>{
        initRequests();
    }, []);
    return(
        <Backdrop isOpen={isOpen} onClose={onClose} onTop>
            <div 
                className="float-center pad no-select" 
                style={{backgroundColor:"rgb(0,0,0,0.80)",color:"lightgray"}} 
                onClick={e=>e.stopPropagation()}>
                <div className="header" style={{borderBottom:"1px solid var(--border)"}}>Requests</div>
                <div style={{width:"300px",height:"40vh",overflowY:"auto"}}>
                    {
                        requests.length?
                        requests.map((request, key)=>(
                            <div onClick={()=>setLogSelected(request)} className="pad-mini item-c-b-hover" style={{borderBottom:"1px solid gray"}} key={key}>
                                <b>{request?.info?.user?.firstName} {request?.info?.user?.firstName}</b>
                                <div style={{fontSize:"12px",lineHeight:"0.5"}}>{request?.info?.user?.role}</div>
                            </div>
                        )):
                        <div>No Requests</div>
                    }
                </div>
                <div className="pad" style={{borderTop:"1px solid var(--border)"}}>
                    <IconButton onClick={onClose} label="Done" icon="close" />
                </div>
            </div>

            <div 
                hidden={!logSelected}
                className="float-center pad no-select" 
                style={{backgroundColor:"white",color:"gray",width:"320px",zIndex:"99",boxShadow:"2px 2px 10px var(--shadow)"}} 
                onClick={e=>e.stopPropagation()}>
                <div className="header">Requst Time Change</div>
                <div>User is requsting time change.</div>
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
                <div className="pad-mini" style={{border:"5px solid lightgray",borderRadius:"5px",height:"100px",overflowY:"auto"}}>
                    {logSelected?.info?.request?.reason}
                </div>
                <div className="flex centered pad max-width">
                    <div className="max-width" style={{textAlign:"right"}}>
                        <IconButton onClick={()=>setLogSelected(null)} label="Close" icon="close" />
                    </div>
                    <div className="max-width" style={{textAlign:"center"}}>
                        <IconButton onClick={onDecline} label="Decline" />
                    </div>
                    <div className="max-width" style={{textAlign:"left"}}>
                        <IconButton onClick={onAccepted} label="Accept" />
                    </div>
                </div>
            </div>
            <LoadingBar isOpen={loading} />
        </Backdrop>
    )
}