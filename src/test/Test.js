import React, { useEffect, useState } from 'react';
import { SpanWrapper } from '../container/SpanWrapper';
import { ADMIN_SIDE_NAV } from '../contents/lists';
import { Navigation } from '../DEV/container/Navigation';
import { Header } from '../layouts/Header';


//https://connecteam.com/best-employee-time-tracking-apps-smb/
export const Test = () =>{
    const [update, setUpdate] = useState();

    useEffect(()=>{
    }, []);
    return(
        <div>
            <Navigation menu={ADMIN_SIDE_NAV} />
        </div>
    )
}