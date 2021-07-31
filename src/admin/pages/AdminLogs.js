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

    const onToggleView = [
        [...users],
        [{title: "List view",command: ()=>setToggleView(true)},
        {title: "Clasic view",command: ()=>setToggleView(false)}]
    ];

    const searchLogsById = async(id) =>{
        setUserId(id);
        setLogs(await getLogsById(id));
    }

    const searchLogsByDate = async() =>{
        const {from, to} = dateObject;
        setLogs(await getLogsRange(from, to, userId));
    }

    const initUsers = async() =>{
        let tempArray = []
        for (let user of await getUsers()){
            tempArray.push({
                title: `${user?.info?.firstName} ${user?.info?.lastName}`,
                value: user?.id,
                command: (value) => searchLogsById(value)
            });
        }
        setUsers(tempArray);
    }

    useEffect(()=>{
        initUsers();
    }, []);

    return (
        <AdminNavBar options={onToggleView}>
            <ContentsWrapper isOpen={!toggleView} noScroll>
                <div className="scrollbar" style={{height:"60vh",overflowY:"auto"}}>
                    <TimeLog logs={logs} />
                </div>
            </ContentsWrapper>
            <TimeCart isOpen={toggleView}  timeOptions={logs} />
        </AdminNavBar>
    )
}