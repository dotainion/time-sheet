import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NoRecord } from '../../../components/widgets/NoRecord';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { adminRoutes } from '../../../utils/routes/Routes';
import { BreadCrumbs } from '../../widgets/BreadCrumbs';
import { AdminInputEntry } from '../other/AdminInputEntry';
import { UsersLists } from './UsersLists';


export const UsersProfile = () =>{
    const [userSelected, setUserSelected] = useState({});

    return(
        <AdminNavBar>
            <ContentsWrapper isOpen style={{paddingTop:"50px"}}>
                <BreadCrumbs updateUserEmail />

                <div className="flex d-flex-on-mobile max-size" style={{minHeight:"400px"}}>
                    <UsersLists onSelected={setUserSelected} />
                    <div className="max-width" style={{paddingLeft:"40px"}}>
                        {
                            Object.keys(userSelected || {}).length?
                            <AdminInputEntry
                                useUpdate
                                userSelected={userSelected}
                                onUpdateComplete={()=>{
                                    //initUsers();
                                    setUserSelected({});
                                }}
                            />:
                            <NoRecord
                                icon="users"
                                header="Edit User's profile"
                                message="From the list to the left, select profile you will like to edit."
                            />
                        }
                        
                    </div>
                </div>
            </ContentsWrapper>
        </AdminNavBar>
    )
}