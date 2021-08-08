import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { adminRoutes } from '../../../utils/routes/Routes';
import { AddOrUpdateNewUser } from './AddOrUpdateNewUser';


export const UsersProfile = () =>{
    const history = useHistory();

    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState({});

    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }

    useEffect(()=>{
        initUsers();
        if (history.location?.user){
            let uUser = history.location?.user;
            let sUser = uUser?.info;
            sUser["id"] = uUser?.id;
            setUserSelected(sUser);
        }
    }, []);
    return(
        <AdminNavBar>
            <ContentsWrapper isOpen style={{paddingTop:"50px"}}>
                <div className="float-top-left pad"><b>
                    {"<"}<span onClick={()=>history.push(adminRoutes.settings)} className="label-hover">Setttings</span>
                    {"<"}<span onClick={()=>history.push(adminRoutes.profile)} className="label-hover">My profile</span>
                </b></div>

                <div className="flex max-size">
                    <div className="users-lists scrollbar">
                        {users?.map((mbr, key)=>(
                            <div 
                                onClick={()=>{
                                    let sUser = mbr?.info;
                                    sUser["id"] = mbr?.id;
                                    setUserSelected(sUser);
                                }} className="users-name"
                                style={{backgroundColor:userSelected?.id === mbr?.id && "rgb(43, 100, 156)"}} key={key}
                            >
                                {`${mbr?.info?.firstName}
                                ${mbr?.info?.lastName}`}
                            </div>
                        ))}
                    </div>
                    <div style={{paddingLeft:"40px"}}>
                        {
                            Object.keys(userSelected || {}).length?
                            <div>
                                <div style={{borderBottom:"1px solid white",padding:"5px",marginBottom:"30px"}}>
                                    <b>{`${userSelected?.firstName} ${userSelected?.lastName}`}</b>
                                </div>
                                <AddOrUpdateNewUser
                                    useUpdate
                                    userSelected={userSelected}
                                    onUpdateComplete={()=>{
                                        initUsers();
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