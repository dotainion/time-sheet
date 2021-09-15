import React, { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { AsignTimeSheet } from '../../widgets/AsignTimeSheet';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { ButtonOption } from '../../../components/widgets/ButtonOption';
import { RiUserSettingsLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { adminRoutes } from '../../../utils/routes/Routes';
import { NoRecord } from '../../../components/widgets/NoRecord';
import { Profile } from '../../../components/other/Profile';
import { Button } from '../../../components/widgets/Buttons';
import defaultImage from '../../../images/default-image.jpg';
import { AiOutlineMail } from 'react-icons/ai';
import { FaCriticalRole } from 'react-icons/fa';
import { CgNametag } from 'react-icons/cg';
import { MdSystemUpdateAlt } from 'react-icons/md';


const NO_RECORD_INFO = "There is no contact in your list.";
const NO_RECORD_SUB_INFO = "Try addin a user first by clicking the (ADD USERS) tab.";



export const Users = () =>{
    const history = useHistory();

    const { user } = useAuth();
    
    const [users, setUsers] = useState([]);

    const onUpdate = (uUser) =>{
        history.push({
            pathname:adminRoutes.usersProfile, 
            user:uUser
        });
    }

    const onSchedule = (uUser) =>{
        history.push({
            pathname:adminRoutes.schedule, 
            user:uUser
        });
    }

    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }

    useEffect(()=>{
        initUsers()
    }, []);
    return (
        <AdminNavBar>
            <div className="pad">
                <div
                    style={{
                        color:"dodgerblue",
                        fontSize:"25px",
                        backgroundColor:"lightgray",
                    }}
                ><b>Member</b></div>
                <div 
                    className="flex" 
                    style={{
                        marginBottom:"10px",
                        padding:"5px",
                        fontWeight:"bold",
                        color:"white",
                        backgroundColor:"dodgerblue",
                        cursor:"default"
                    }}
                >
                    <div className="max-width" style={{paddingLeft:"55px"}}><CgNametag style={{marginRight:"5px",fontSize:"20px"}}/>Name</div>
                    <div className="max-width"><AiOutlineMail style={{marginRight:"5px",fontSize:"20px"}}/>Email</div>
                    <div className="max-width"><FaCriticalRole style={{marginRight:"5px",fontSize:"20px"}}/>Role</div>
                    <div className="max-width"><MdSystemUpdateAlt style={{marginRight:"5px",fontSize:"20px"}}/>Update</div>
                </div>
                <div style={{overflowY:"auto",overflowX:"hidden",height:"65vh"}}>
                    {
                        users?.length?
                        users?.map((user, key)=>(
                            <div onClick={()=>onSchedule(user)} className="content-container" key={key}>
                                <div className="header-profile"><img src={user?.info?.image || defaultImage} alt="" style={{cursor:"pointer"}} /></div>
                                <div className="max-width" style={{minWidth:"150px"}}><b className="float-left" style={{left:"5px"}}>{`${user?.info?.firstName} ${user?.info?.lastName}`}</b></div>
                                <div className="max-width" style={{minWidth:"150px"}}><div className="float-left">{user?.info?.email}</div></div>
                                <div className="max-width" style={{minWidth:"150px"}}><div className="float-left">{user?.info?.role}</div></div>
                                <div className="max-width">
                                    <div onClick={e=>e.stopPropagation()} className="float-left">
                                        <Button onClick={()=>onUpdate(user)} label="Update" />
                                    </div>
                                </div>
                            </div>
                        )):
                        <NoRecord icon="users" message={NO_RECORD_INFO} subMessage={NO_RECORD_SUB_INFO} />
                    }
                </div>
            </div>
        </AdminNavBar>
    )
}