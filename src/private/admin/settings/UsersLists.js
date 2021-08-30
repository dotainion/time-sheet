import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { AiOutlineCloseCircle, AiOutlineUsergroupAdd } from 'react-icons/ai';


export const UsersLists = ({onSelected}) =>{
    const history = useHistory();

    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState({});
    const [showSideBar, setShowSideBar] = useState("");

    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }

    const triggerSelect = (uUser) =>{
        let sUser = uUser?.info;
        sUser["id"] = uUser?.id;
        setUserSelected(sUser);
        try{
            onSelected(sUser);
        }catch(error){
            alert(error)
        }
    }

    const toggleSideBar = () =>{
        if (showSideBar) setShowSideBar("");
        else setShowSideBar("hide-switch");
    }

    useEffect(()=>{
        initUsers();
        if (history.location?.user){
            let sUser = history.location?.user;
            triggerSelect(sUser);
        }
    }, []);
    return(
        <>
        <AiOutlineUsergroupAdd
            className="float-top-left users-lists-icon"
            onClick={toggleSideBar}
        />
        <div className={`users-lists scrollbar ${showSideBar}`}>
            <div
                className="hide-on-desktop" 
                style={{
                    height:"30px",
                    backgroundColor:"skyblue"
                }}>
                <AiOutlineCloseCircle
                    className="float-top-right"
                    style={{
                        fontSize:"23px",
                        top:"3px",
                        right:"3px"
                    }}
                    onClick={toggleSideBar}
                />
            </div>
            {users?.map((mbr, key)=>(
                <div 
                    onClick={()=>{triggerSelect(mbr)}} className="users-name"
                    style={{backgroundColor:userSelected?.id === mbr?.id && "rgb(43, 100, 156)"}} key={key}
                >
                    {`${mbr?.info?.firstName}
                    ${mbr?.info?.lastName}`}
                </div>
            ))}
        </div>
        </>
    )
}