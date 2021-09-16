import React, { useEffect, useState } from 'react';
import { Button } from '../components/widgets/Buttons';
import { TimeCard } from '../components/widgets/TimeCard';
import { SpanWrapper } from '../container/SpanWrapper';
import { ADMIN_SIDE_NAV } from '../contents/lists';
import { Navigation } from '../DEV/container/Navigation';
import { xlFile } from '../files/ExcelFile';
import { Header } from '../layouts/Header';
import { tools } from '../utils/tools/Tools';


//https://connecteam.com/best-employee-time-tracking-apps-smb/


export const Test = () =>{

    const update = () =>{
        xlFile.download();
    }

    return(
        <div>
            <TimeCard/>
        </div>
    )
}

