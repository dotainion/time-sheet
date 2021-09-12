import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { useAuth } from '../../../state/auth/Authentication';
import { BreadCrumbs } from '../../widgets/BreadCrumbs';
import { UserEntryInputs } from './UserEntryInputs';


export const AdminProfile = () =>{
    const history = useHistory();

    const { user, initUser } = useAuth();

    const onUpdate = () =>{
        initUser?.();
    }

    return(
        <AdminNavBar>
            <ContentsWrapper isOpen style={{paddingTop:"50px"}}>
                <BreadCrumbs myProfile />

                <UserEntryInputs
                    useUpdate
                    roleDisabled
                    userSelected={user}
                    onUpdateComplete={onUpdate}
                />
            </ContentsWrapper>
        </AdminNavBar>
    )
}