import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { useAuth } from '../../../state/auth/Authentication';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';
import { BreadCrumbs } from '../../widgets/BreadCrumbs';
import { AdminInputEntry } from '../other/AdminInputEntry';


export const AdminProfile = () =>{
    const history = useHistory();

    const { user, initUser } = useAuth();

    const onUpdate = () =>{
        initUser?.();
    }

    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer  myProfile>
                <AdminInputEntry
                    useUpdate
                    roleDisabled
                    userSelected={user}
                    onUpdateComplete={onUpdate}
                />
            </AdminSettignsContainer>
        </AdminNavBar>
    )
}