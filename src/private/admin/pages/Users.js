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


let checkboxIds = [];
let userAppended = [];
export const Users = () =>{
    const history = useHistory();

    const { user } = useAuth();
    
    const [users, setUsers] = useState([]);
    const [asignTimeSheet, setAsignTimeSheet] = useState(false);
    const [usersSelected, setUsersSelected] = useState([]);
    const [showSelectOption, setShowSelectOption]= useState(false);
    const [idToggle, setIdToggle] = useState(false);

    const appendCheckboxIds = (id) =>{
        checkboxIds.push(id);
        return id;
    }

    const onSelectAll = (state) =>{
        for (let id of checkboxIds){
            document.getElementById(id).checked = state;
        }
        if (state) userAppended = users;
        else userAppended = [];
        setIdToggle(state);
    }

    const onCancelSelect = () =>{
        onSelectAll(false);
        setShowSelectOption(false);
    }

    const isAnyCheckboxSelected = () =>{
        if (userAppended.length){
            return setShowSelectOption(true);
        }
        setShowSelectOption(false);
    }

    const append = (membr) =>{
        userAppended.push(membr);
    }

    const poped = (membr) =>{
        let tempAppend = [];
        for (let mbr of userAppended){
            if (mbr?.id !== membr?.id){
                tempAppend.push(mbr);
            }
        }
        userAppended = tempAppend;
    }

    const appendUserOrPop = (checked, membr) =>{
        if (checked) append(membr);
        else poped(membr);
        isAnyCheckboxSelected();
    }

    const selectSingleUser = (data) =>{
        userAppended = [data];
        onShowAsigntimeSheet();
    }

    const onShowAsigntimeSheet = () =>{
        if (userAppended.length){
            setUsersSelected(userAppended);
            setAsignTimeSheet(true);
        }
    }

    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }

    useEffect(()=>{
        initUsers()
    }, []);
    return (
        <AdminNavBar>
            <ContentsWrapper isOpen={true} noScroll>
                <div hidden={!showSelectOption} className="calendar-event-floating-btn float-top-left" style={{top:"-30px"}}>
                    <div>
                        <button onClick={()=>onSelectAll(!idToggle)} className="btn btn-hover" style={{color:"blue"}}>{idToggle?"Deselect All":"Select All"}</button>
                        <button onClick={onShowAsigntimeSheet} className="btn btn-hover" style={{color:"teal"}}>Asign</button>
                        <button onClick={onCancelSelect} className="btn btn-hover" style={{color:"red"}}>Cancel</button>
                    </div>
                </div>
                <div
                    style={{
                        fontSize:"25px",
                        borderBottom:"1px solid white",
                        marginBottom:"10px"
                    }}
                ><b>New Member</b></div>
                <div className="scrollbar" style={{overflowY:"auto",overflowX:"hidden",height:"65vh"}}>
                    {
                        users?.length?
                        users?.map((user, key)=>(
                            <div className="flex relative content-container" style={{padding:"2px",borderBottom:"1px solid skyblue",marginTop:"10px"}} key={key}>
                                <div className="relative">
                                    <input onChange={e=>appendUserOrPop(e.target.checked, user)} id={appendCheckboxIds(`${user?.id}-ec`)} style={{margin:"10px",marginTop:"20px"}} type="checkbox"/>
                                </div>
                                <div className="relative">
                                    <IoPersonCircleOutline className="log-icon" style={{marginRight:"10px",color:"white"}} />
                                </div>
                                <div onClick={()=>{!showSelectOption && selectSingleUser(user)}} className="content-container">
                                    <div className="content-inner-container flex d-flex-on-mobile">
                                        <div className="max-width" style={{minWidth:"150px"}}><b>{`${user?.info?.firstName} ${user?.info?.lastName}`}</b></div>
                                        <div className="max-width" style={{minWidth:"150px"}}>{user?.info?.email}</div>
                                        <div style={{minWidth:"150px"}} className="max-width">Role: {user?.info?.role}</div>
                                    </div>
                                </div>
                                <div className="float-right">
                                    <RiUserSettingsLine onClick={()=>history.push({pathname:adminRoutes.usersProfile, user:user})} className="user-setting-icon" />
                                </div>
                            </div>
                        )):
                        <div>No Users</div>
                    }
                </div>
            </ContentsWrapper>
            <AsignTimeSheet
                usersSelected={usersSelected}
                isOpen={asignTimeSheet}
                onClose={()=>{
                    setUsersSelected([]);
                    setAsignTimeSheet(false);
                }}
            />
        </AdminNavBar>
    )
}