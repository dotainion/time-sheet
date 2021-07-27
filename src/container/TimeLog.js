import React from 'react';
import { tools } from '../tools/Tools';
import { FcOvertime } from 'react-icons/fc';

export const TimeLog = ({logs, onClick}) =>{
    const timeHander = (cmd, time) =>{
        if (time === "none") return <b>In progress...</b>;
        if (cmd === "time") return tools.time.time(time);
        if (cmd === "date") return tools.time.date(time);
    }
    return (
        <div>
            {
                logs?.length?
                tools.time.sort(logs)?.map((log, key)=>(
                    <div onClick={onClick} className="flex content-container" key={key}>
                        <FcOvertime className="float-center log-icon" />
                        <div>
                            <div>Date: {timeHander("date",log?.info?.start)}</div>
                            <div>Start: {timeHander("time",log?.info?.start)}</div>
                            <div>End: {timeHander("time",log?.info?.end)}</div>
                        </div>
                    </div>
                )):
                <div>No Record</div>
            }
        </div>
    )
}