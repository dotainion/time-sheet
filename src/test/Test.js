import React, { useEffect, useState } from 'react';
import { SpanWrapper } from '../container/SpanWrapper';
import { Header } from '../layouts/Header';


//https://connecteam.com/best-employee-time-tracking-apps-smb/
export const Test = () =>{
    const [update, setUpdate] = useState();

    useEffect(()=>{
    }, []);
    return(
        <div>
            <Header/>
        </div>
    )
}