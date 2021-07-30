import React, { useEffect, useState } from 'react';
import { getLogsById, getLogsRange } from '../../database/logs/LogDb';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { TimeLog } from '../../widgets/TimeLog';
import { useStore } from '../../state/stateManagement';
import { TimeCart } from '../../widgets/TimeCard';
import { AdminNavBar } from '../../container/AdminNavBar';
import { getUsers } from '../../database/accounts/AccountsDb';

export const AdminLogs = () =>{
    const { dateObject } = useStore();

    const [users, setUsers] = useState([]);
    const [toggleView, setToggleView] = useState(false);
    const [logs, setLogs] = useState([]);
    const [userId, setUserId] = useState([]);

    const searchLogsById = async(id) =>{
        setUserId(id);
        setLogs(await getLogsById(id));
    }

    const searchLogsByDate = async() =>{
        const {from, to} = dateObject;
        setLogs(await getLogsRange(from, to, userId));
    }

    const onToggleView = (cmd) =>{
        if (cmd === "true") setToggleView(true);
        if (cmd === "false") setToggleView(false);
    }

    const initUsers = async() =>{
        setUsers(await getUsers());
    }

    useEffect(()=>{
        initUsers();
    }, []);

    return (
        <AdminNavBar>
            <div className="centered" style={{whiteSpace:"nowrap"}}>
                <select onChange={(e)=>searchLogsById(e.target.value)} className="input" style={{boxShadow:"4px 4px 5px black"}}>
                    <option hidden defaultChecked>Select Member</option>
                    {users?.map((member, key)=>(
                        <option value={member?.id} key={key}>{`
                            ${member?.info?.firstName}
                            ${member?.info?.lastName}
                        `}</option>
                    ))}
                </select>
                <select onChange={(e)=>onToggleView(e.target.value)} className="input" style={{boxShadow:"4px 4px 5px black",marginLeft:"10px"}}>
                    <option value={true}>List view</option>
                    <option value={false}>Clasic view</option>
                </select>
            </div>
            <ContentsWrapper isOpen={!toggleView} noScroll>
                <div className="scrollbar" style={{height:"60vh",overflowY:"auto"}}>
                    <TimeLog logs={logs} />
                </div>
            </ContentsWrapper>
            <TimeCart isOpen={toggleView}  timeOptions={logs} />
        </AdminNavBar>
    )
}