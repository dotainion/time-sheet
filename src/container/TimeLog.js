import React from 'react';
import { tools } from '../tools/Tools';
import { FcOvertime } from 'react-icons/fc';

export const TimeLog = ({logs, onClick}) =>{
    return (
        <div>
            {
                logs?.length?
                tools.time.sort(logs)?.map((log, key)=>(
                    <div onClick={onClick} className="flex content-container" key={key}>
                        <FcOvertime className="float-center log-icon" />
                        <div>
                            <div>Date: {log?.info?.date}</div>
                            <div>Start: {tools.time.time(log?.info?.start)}</div>
                            <div>End: {tools.time.time(log?.info?.end)}</div>
                        </div>
                    </div>
                )):
                <div>No Record</div>
            }
        </div>
    )
}