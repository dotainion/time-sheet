import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../components/widgets/Buttons';
import { IconButton } from '../components/widgets/IconButon';
import { InputCheckbox } from '../components/widgets/InputCheckbox';
import { NoRecord } from '../components/widgets/NoRecord';
import { SearchBar } from '../components/widgets/SearchBar';
import { TimeCard } from '../components/widgets/TimeCard';
import { TimePicker } from '../components/widgets/TimePicker';
import { WidgetsInfo } from '../components/widgets/WidgetsInfo';
import { AdminNavBar } from '../container/AdminNavBar';
import { NavigationBar } from '../container/NavigationBar';
import { SpanWrapper } from '../container/SpanWrapper';
import { ADMIN_SIDE_NAV } from '../contents/lists';
import { getUsers } from '../database/accounts/AccountsDb';
import { xlFile } from '../files/ExcelFile';
import { Header } from '../layouts/Header';
import { useAuth } from '../state/auth/Authentication';
import { tools } from '../utils/tools/Tools';
import { getLogsRange } from '../database/logs/LogDb';
import { DateEntry } from '../components/widgets/DateEntry';
import { ADMIN_SUPERVISER } from '../contents/AuthValue';
import defaultImage from '../images/default-profile-image.png';
import { LoadingBar } from '../components/widgets/LoadingBar';
import { time } from '../utils/time/Time';

//https://connecteam.com/best-employee-time-tracking-apps-smb/


let muliUserIds = [];
export const Test = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);
    

    useEffect(()=>{
        //console.log(time.sub("3:28:11", "3:25:40"));
    }, []);

    return(
        <div>
            testing
        </div>
    )
}

