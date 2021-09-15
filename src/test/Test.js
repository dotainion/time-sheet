import React, { useEffect, useState } from 'react';
import { Button } from '../components/widgets/Buttons';
import { SpanWrapper } from '../container/SpanWrapper';
import { ADMIN_SIDE_NAV } from '../contents/lists';
import { Navigation } from '../DEV/container/Navigation';
import { Header } from '../layouts/Header';
import { tools } from '../utils/tools/Tools';


//https://connecteam.com/best-employee-time-tracking-apps-smb/

let currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 5);

let pastDate = new Date();
export const Test = () =>{
    //const [update, setUpdate] = useState();

    const update = () =>{
        console.log(tools.time.subTimeReturnObj(pastDate, currentDate));
    }

    useEffect(()=>{
        update();
    }, []);
    return(
        <div>
            <div className="float-center">
                <div>Test</div>
                <Button onClick={update} label="Click me" />
            </div>
        </div>
    )
}