import React, { useEffect, useState } from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';


export const UsersProfile = () =>{
    const { user } = useAuth();

    const [users, setUsers] = useState([]);

    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }

    useEffect(()=>{
        initUsers();
    }, []);
    return(
        <AdminNavBar>
            <ContentsWrapper isOpen>
                <div className="flex max-size">
                    <div className="users-lists">
                        {users?.map((mbr, key)=>(
                            <div className="users-name" key={key}>
                                {`${mbr?.info?.firstName}
                                ${mbr?.info?.lastName}`}
                            </div>
                        ))}
                    </div>
                    <div>

                    </div>
                </div>
            </ContentsWrapper>
        </AdminNavBar>
    )
}