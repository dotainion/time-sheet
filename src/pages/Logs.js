import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/Authentication';
import { getLogs } from '../database/dbActions';
import { UserNavBar } from '../container/UserNavBar';
import { AdminPageWrapper } from '../container/AdminPageWrapper';
import { TimeLog } from '../container/TimeLog';
import { tools } from '../tools/Tools';

export const Logs = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);

    const onSearch = (dateObj) =>{
        const {from, to} = dateObj;
    }

    const initLogs = async() =>{
        setLogs(await getLogs(user?.id));
    }

    useEffect(() => {
        initLogs();
    }, []);

    return(
        <UserNavBar onDatePicker={onSearch}>
            <AdminPageWrapper isOpen={true}>
                <TimeLog logs={logs} />
            </AdminPageWrapper>
        </UserNavBar>
    )
}