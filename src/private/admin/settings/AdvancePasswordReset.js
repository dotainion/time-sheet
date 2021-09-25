import React from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';


export const AdvancePasswordReset = () =>{
    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer advanceReset>

            </AdminSettignsContainer>
        </AdminNavBar>
    )
}