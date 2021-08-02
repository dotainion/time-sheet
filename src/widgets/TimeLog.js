import React from 'react';
import { tools } from '../tools/Tools';
import { FcOvertime } from 'react-icons/fc';

export const TimeLog = ({logs, hidden, onClick}) =>{
    const timeHander = (cmd, time) =>{
        if (time === "none") return <b>In progress...</b>;
        if (cmd === "time") return tools.time.time(time);
        if (cmd === "date") return tools.time.date(time);
    }
    return (
        <div hidden={hidden} className="max-width">
            {
                logs?.length?
                tools.time.sort(logs)?.reverse()?.map((log, key)=>(
                    <div onClick={onClick} className="relative" style={{margin:"10px",marginRight:"40px"}} key={key}>
                        <div style={{minWidth:"50px"}}>
                            <FcOvertime className="float-left log-icon" style={{transform:"translate3d(-20%,-50%,0)"}} />
                        </div>
                        <div className="flex content-container" style={{overflow:"hidden"}}>
                            <div className="flex d-flex-on-mobile max-width" style={{paddingLeft:"30px"}}>
                                <div style={{minWidth:"150px",with:"50%"}}>Date: {timeHander("date",log?.info?.start)}</div>
                                <div style={{minWidth:"150px",with:"50%"}}>Start: {timeHander("time",log?.info?.start)}</div>
                                <div style={{minWidth:"150px",with:"50%"}}>End: {timeHander("time",log?.info?.end)}</div>
                            </div>
                        </div>
                    </div>
                )):
                <div>No Record</div>
            }
        </div>
    )
}