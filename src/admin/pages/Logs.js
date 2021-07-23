import React, { useState } from 'react';
import { getLogsById } from '../../database/dbActions';
import { FcOvertime } from 'react-icons/fc';
import { useAuth } from '../../auth/Authentication';
import { AdminPageWrapper } from '../../container/AdminPageWrapper';

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
                {
                    logs.length?
                    logs.map((log, key)=>(                            
                        <div className="admin-page-sub-container flex" key={key}>
                            <FcOvertime className="float-center log-icon" />
                            <div>
                                <div>Date: {log?.info?.start?.date}</div>
                                <div>Start: {log?.info?.start?.time}</div>
                                <div>End: {log?.info?.end?.time}</div>
                            </div>
                        </div>
                    )):
                    <div>No Logs</div>
                } 
            </div>
        </AdminPageWrapper>
    )
}