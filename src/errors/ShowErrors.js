import React from 'react';
import { useError } from '../errors/Error';


export const ShowErrors = () =>{
    const { error } = useError();
    return(
        <div hidden={!error} className="float-bottom-overflow error">{error}</div>
    )
}