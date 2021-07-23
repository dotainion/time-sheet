import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/Authentication';
import { NavigationBar } from '../container/NavigationBar';
import { getLogs } from '../database/dbActions';
import { FcOvertime } from 'react-icons/fc';

export const Logs = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);

    const initLogs = async() =>{
        setLogs(await getLogs(user?.id));
    }
    useEffect(() => {
        initLogs();
    }, []);
    return(
        <NavigationBar>
            <div  className="centered user-page-outter-container">
                <div className="user-page-container scrollbar">
                    {
                        logs.length?
                        logs.map((log, key)=>(
                            <div className="user-page-sub-container" key={key}>
                                <FcOvertime className="float-center log-icon" />
                                <div>
                                    <div>Date: {log?.info?.start?.date}</div>
                                    <div>Start: {log?.info?.start?.time}</div>
                                    <div>End: {log?.info?.end?.time}</div>
                                </div>
                            </div>
                        )):
                        <div>No records</div>
                    }
                </div>
            </div>
        </NavigationBar>
    )
}