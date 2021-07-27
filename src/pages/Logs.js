import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/Authentication';
import { getLogs, getLogsRange } from '../database/dbActions';
import { UserNavBar } from '../container/UserNavBar';
import { TimeLog } from '../container/TimeLog';
import { ContentsWrapper } from '../container/ContentsWrapper';


export const Logs = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);

    const onSearch = async(dateObj) =>{
        const {from, to} = dateObj;
        setLogs(await getLogsRange(from, to, user?.id));
    }

    const initLogs = async() =>{
        setLogs(await getLogs(user?.id));
    }

    useEffect(() => {
        initLogs();
    }, []);

    return(
        <UserNavBar onDatePicker={onSearch}>
            <ContentsWrapper isOpen>
                <TimeLog logs={logs} />
            </ContentsWrapper>
        </UserNavBar>
    )
}