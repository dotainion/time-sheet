import React, { useEffect, useState } from 'react';
import { getLogsById, getLogsRange } from '../../database/dbActions';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { TimeLog } from '../../container/TimeLog';
import { useAuth } from '../../auth/Authentication';
import { useStateMangement } from '../../stateManagement/stateManagement';

export const Logs = ({isOpen, searchRef, members}) =>{
    const { dateObject } = useStateMangement();

    const [logs, setLogs] = useState([]);
    const [userId, setUserId] = useState([]);

    const searchLogsById = async(id) =>{
        setUserId(id);
        setLogs(await getLogsById(id));
    }

    const searchLogsByDate = async() =>{
        const {from, to} = dateObject;
        console.log(from, to);
        setLogs(await getLogsRange(from, to, userId));
    }

    return (
        <ContentsWrapper isOpen={isOpen} noScroll>
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
            <div onClick={searchLogsByDate} ref={searchRef} />
        </ContentsWrapper>
    )
}