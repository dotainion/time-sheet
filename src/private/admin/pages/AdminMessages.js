import React from 'react';
import { Messages } from '../../../apps/other/Messages';
import { AdminNavBar } from '../../../container/AdminNavBar';


export const AdminMessages = () =>{
    return(
        <AdminNavBar>
            <Messages />
        </AdminNavBar>
    )
}