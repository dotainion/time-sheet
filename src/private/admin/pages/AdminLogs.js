import React from 'react';
import { TimeCard } from '../../../components/widgets/TimeCard';
import { AdminNavBar } from '../../../container/AdminNavBar';

export const AdminLogs = () =>{
    return (
        <AdminNavBar>
            <TimeCard isOpen header="User Logs" />
        </AdminNavBar>
    )
}