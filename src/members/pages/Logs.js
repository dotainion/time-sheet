import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/Authentication';
import { UserNavBar } from '../../container/UserNavBar';
import { TimeLog } from '../../widgets/TimeLog';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { TimeCart } from '../../widgets/TimeCard';
import { getLogs, getLogsRange } from '../../database/logs/LogDb';


export const Logs = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);
    const [showView, setShowView] = useState(false);

    const options = [{title:"List view"},{title:"Clasic view"}];

    const onSearch = async(dateObj) =>{
        const {from, to} = dateObj;
        setLogs(await getLogsRange(from, to, user?.id));
    }

    const initLogs = async() =>{
        setLogs(await getLogs(user?.id));
    }

    const toggleView = (e) =>{
        const cmd = e.target.value;
        if (cmd === options[0].title) setShowView(false);
        if (cmd === options[1].title) setShowView(true);
    }

    useEffect(() => {
        initLogs();
    }, []);

    return(
        <UserNavBar onDatePicker={onSearch} onOptionChange={toggleView} options={options}>
            <ContentsWrapper isOpen={showView} maxWith >
                <TimeLog logs={logs} />
            </ContentsWrapper>
            <TimeCart isOpen={!showView} timeOptions={logs} />
        </UserNavBar>
    )
}