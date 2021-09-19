import React from 'react';
import { useError } from '../errors/Error';


export const ShowErrors = () =>{
    const { error, status } = useError();
    return(
        <div className="float-top-center error">
            {error?.trim?.() && !status?.trim?.() && <div style={{padding:"5px"}}>{error}</div>}
            {status?.trim?.() && <div style={{padding:"5px",color:"white"}}>{status}</div>}
        </div>
    )
}