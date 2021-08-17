import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { adminRoutes } from '../../../utils/routes/Routes';
import { BreadCrumbs } from '../../widgets/BreadCrumbs';
import { UserEntryInputs } from './UserEntryInputs';
import { UsersLists } from './UsersLists';


export const UsersProfile = () =>{
    const [userSelected, setUserSelected] = useState({});

    return(
        <AdminNavBar>
            <ContentsWrapper isOpen style={{paddingTop:"50px"}}>
                <BreadCrumbs/>

                <div className="flex d-flex-on-mobile max-size">
                    <UsersLists onSelected={setUserSelected} />
                    <div className="max-width" style={{paddingLeft:"40px"}}>
                        {
                            Object.keys(userSelected || {}).length?
                            <div>
                                <div style={{borderBottom:"1px solid white",padding:"5px",marginBottom:"30px"}}>
                                    <b>{`${userSelected?.firstName} ${userSelected?.lastName}`}</b>
                                </div>
                                <UserEntryInputs
                                    useUpdate
                                    userSelected={userSelected}
                                    onUpdateComplete={()=>{
                                        //initUsers();
                                        setUserSelected({});
                                    }}
                                />
                            </div>:
                            <div>Select a user for editing</div>
                        }
                        
                    </div>
                </div>
            </ContentsWrapper>
        </AdminNavBar>
    )
}