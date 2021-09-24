import React from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';
import { BreadCrumbs } from '../../widgets/BreadCrumbs';


export const AdvancePasswordReset = () =>{
    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer advanceReset>

            </AdminSettignsContainer>
        </AdminNavBar>
    )
}