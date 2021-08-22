import React, { useEffect, useState } from 'react';
import { useAuth } from '../../state/auth/Authentication';
import { UserNavBar } from '../../container/UserNavBar';
import { TimeLog } from '../../components/widgets/TimeLog';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { TimeCard } from '../../components/widgets/TimeCard';
import { getLogs, getLogsRange } from '../../database/logs/LogDb';


export const Logs = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);
    const [showView, setShowView] = useState(false);

    const options = [[
        {title:"List view",command:()=>setShowView(false)},
        {title:"Clasic view",command:()=>setShowView(true)}
    ]];

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
        <UserNavBar onDatePicker={onSearch} options={options}>
            <ContentsWrapper isOpen={showView} maxWith >
                <TimeLog logs={logs} />
            </ContentsWrapper>
            <TimeCard isOpen={!showView} timeOptions={logs} useSchedule />
        </UserNavBar>
    )
}