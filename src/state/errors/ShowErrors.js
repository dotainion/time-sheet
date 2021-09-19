import React from 'react';
import { useError } from '../errors/Error';


export const ShowErrors = () =>{
    const { error } = useError();
    return(
        <div className="float-top-center error">
            {error?.trim?.() && <div style={{padding:"5px"}}>{error}</div>}
        </div>
    )
}