import React, { useEffect, useState } from 'react';
import { getLogsById, getLogsRange } from '../../../database/logs/LogDb';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { TimeLog } from '../../../components/widgets/TimeLog';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { TimeCart } from '../../../components/widgets/TimeCard';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';

export const AdminLogs = () =>{
    const { user } = useAuth();
    const { dateObject } = useStore();

    const [users, setUsers] = useState([]);
    const [toggleView, setToggleView] = useState(false);
    const [logs, setLogs] = useState([]);
    const [userId, setUserId] = useState([]);

    const membersList = [
        [...users],
        [{title: "List view",command: ()=>setToggleView(false)},
        {title: "Clasic view",command: ()=>setToggleView(true)}]
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
        for (let mebr of await getUsers(user?.accessId, user?.id)){
            tempArray.push({
                title: `${mebr?.info?.firstName} ${mebr?.info?.lastName}`,
                value: mebr?.id,
                command: (value) => searchLogsById(value)
            });
        }
        setUsers(tempArray);
    }

    useEffect(()=>{
        initUsers();
    }, []);

    return (
        <AdminNavBar options={membersList}>
            <ContentsWrapper isOpen={toggleView} noScroll>
                <div className="scrollbar" style={{height:"60vh",overflowY:"auto"}}>
                    <TimeLog logs={logs} />
                </div>
            </ContentsWrapper>
            <TimeCart isOpen={!toggleView}  timeOptions={logs} />
        </AdminNavBar>
    )
}