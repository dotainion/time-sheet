import React from 'react';
import { useHistory } from 'react-router-dom';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { useAuth } from '../../../state/auth/Authentication';
import { adminRoutes } from '../../../utils/routes/Routes';
import { AddOrUpdateNewUser } from './AddOrUpdateNewUser';


export const AdminProfile = () =>{
    const history = useHistory();

    const { user, initUser } = useAuth();

    return(
        <AdminNavBar>
            <ContentsWrapper isOpen style={{paddingTop:"50px"}}>
                <div className="float-top-left pad"><b>
                    {"<"}<span onClick={()=>history.push(adminRoutes.settings)} className="label-hover">Setttings</span>
                    {"<"}<span onClick={()=>history.push(adminRoutes.usersProfile)} className="label-hover">Users profile</span>
                </b></div>

                <AddOrUpdateNewUser
                    useUpdate
                    roleDisabled
                    userSelected={user}
                    onUpdateComplete={initUser}
                />
            </ContentsWrapper>
        </AdminNavBar>
    )
}