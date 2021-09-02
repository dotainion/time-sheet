import React, { useEffect, useState } from 'react';
import { useAuth } from '../../state/auth/Authentication';
import { UserNavBar } from '../../container/UserNavBar';
import { TimeLog } from '../../components/widgets/TimeLog';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { TimeCard } from '../../components/widgets/TimeCard';
import { getLogs, getLogsRange } from '../../database/logs/LogDb';


export const Logs = () =>{
    return(
        <UserNavBar>
            <TimeCard isOpen useSchedule header="Time Logs" />
        </UserNavBar>
    )
}