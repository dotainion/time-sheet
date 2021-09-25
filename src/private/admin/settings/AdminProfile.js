import React from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { useAuth } from '../../../state/auth/Authentication';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';
import { AdminInputEntry } from '../other/AdminInputEntry';


export const AdminProfile = () =>{

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