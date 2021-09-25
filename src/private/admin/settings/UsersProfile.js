import React, { useState } from 'react';
import { NoRecord } from '../../../components/widgets/NoRecord';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';
import { AdminInputEntry } from '../other/AdminInputEntry';
import { UsersLists } from './UsersLists';


export const UsersProfile = () =>{
    const [userSelected, setUserSelected] = useState({});

    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer updateUserEmail>
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
            </AdminSettignsContainer>
        </AdminNavBar>
    )
}