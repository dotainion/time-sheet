import React, { useEffect, useReducer, useRef, useState } from 'react';
import { AdminNavBar } from '../container/AdminNavBar';
import { Button } from '../components/widgets/Buttons';
import { IconButton } from '../components/widgets/IconButon';
import { InputCheckbox } from '../components/widgets/InputCheckbox';
import { NoRecord } from '../components/widgets/NoRecord';
import { SearchBar } from '../components/widgets/SearchBar';
import { WidgetsInfo } from '../components/widgets/WidgetsInfo';
import { getUser, getUsers } from '../database/accounts/AccountsDb';
import { xlFile } from '../files/ExcelFile';
import { useAuth } from '../state/auth/Authentication';
import { getLogsRange } from '../database/logs/LogDb';
import { DateEntry } from '../components/widgets/DateEntry';
import defaultImage from '../images/default-profile-image.png';
import { LoadingBar } from '../components/widgets/LoadingBar';
import { time } from '../utils/time/Time';
import $ from 'jquery';
import { useHistory } from 'react-router';
import { adminRoutes } from '../utils/routes/Routes';
import { tools } from '../utils/tools/Tools';


export const Test = () =>{
    const history = useHistory();
    const { user } = useAuth();
    
    const onClick = (...args) =>{
        console.log(tools.bindStr(...args));
    };

    return(
        <div>
            <button className="float-center" onClick={()=>onClick("js","bs","jacks")}>Click me</button>
        </div>
    )
}

