import React from 'react';
import { useHistory } from 'react-router-dom';
import { adminWelcome } from '../../contents/Sentences';


export const NotAutherize = () =>{
    const history = useHistory();
    return (
        <div className="no-select">
            <p className="admin-welcome">{adminWelcome}</p>
            <h1 className="float-center ">Not autherize</h1>
        </div>
    )
}