import React, { useEffect, useState } from 'react';
import { SpanWrapper } from '../container/SpanWrapper';


export const Test = () =>{
    const [update, setUpdate] = useState();

    useEffect(()=>{
    }, []);
    return(
        <div>
            <SpanWrapper isOpen>
            </SpanWrapper>
        </div>
    )
}