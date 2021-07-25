import React, { useState } from 'react';
import { getLogsById } from '../../database/dbActions';
import { AdminPageWrapper } from '../../container/AdminPageWrapper';
import { TimeLog } from '../../container/TimeLog';

export const Logs = ({isOpen, members}) =>{
    const [logs, setLogs] = useState([]);

    const searchLogsById = async(id) =>{
        setLogs(await getLogsById(id));
    }

    return (
        <AdminPageWrapper isOpen={isOpen} noScroll>
            <select onChange={(e)=>searchLogsById(e.target.value)} className="input centered">
                <option hidden defaultChecked>Select Member</option>
                {members?.map((member, key)=>(
                    <option value={member?.id} key={key}>{`
                        ${member?.info?.firstName}
                        ${member?.info?.lastName}
                    `}</option>
                ))}
            </select>
            <div className="scrollbar" style={{height:"60vh",overflowY:"auto"}}>
                <TimeLog logs={logs} />
            </div>
        </AdminPageWrapper>
    )
}