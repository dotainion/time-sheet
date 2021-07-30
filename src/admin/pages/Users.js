import React, { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { AsignTimeSheet } from '../widgets/AsignTimeSheet';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { AdminNavBar } from '../../container/AdminNavBar';
import { getUsers } from '../../database/accounts/AccountsDb';

let checkboxIds = [];
let userAppended = [];
export const Users = () =>{
    const [users, setUsers] = useState([]);
    const [asignTimeSheet, setAsignTimeSheet] = useState(false);
    const [usersSelected, setUsersSelected] = useState([]);
    const [showSelectOption, setShowSelectOption]= useState(false);
    const [idToggle, setIdToggle] = useState(false);

    const configIds = (id) =>{
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

    const appendUser = (checked, membr) =>{
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
        setUsers(await getUsers());
    }

    useEffect(()=>{
        initUsers()
    }, []);
    return (
        <AdminNavBar>
            <ContentsWrapper isOpen={true}>
                <div hidden={!showSelectOption} className="calendar-event-floating-btn float-top-left" style={{top:"-30px"}}>
                    <div>
                        <button onClick={()=>onSelectAll(!idToggle)} className="btn btn-hover" style={{color:"blue"}}>{idToggle?"Deselect All":"Select All"}</button>
                        <button onClick={onShowAsigntimeSheet} className="btn btn-hover" style={{color:"teal"}}>Asign</button>
                        <button onClick={onCancelSelect} className="btn btn-hover" style={{color:"red"}}>Cancel</button>
                    </div>
                </div>
                {
                    users?.length?
                    users?.map((user, key)=>(
                        <div className="flex content-container" key={key}>
                            <input onChange={e=>appendUser(e.target.checked, user)} id={configIds(`${user?.id}-ec`)} className="float-left" style={{left:"-50px"}} type="checkbox"/>
                            <IoPersonCircleOutline className="float-center log-icon" />
                            <div className="content-inner-container">
                                <div><b>{`${user?.info?.firstName} ${user?.info?.lastName}`}</b></div>
                                <div>{user?.info?.email}</div>
                                <div>Role: {user?.info?.role}</div>
                            </div>
                            <div className="time-icon-container">
                                <AiOutlineFieldTime
                                    className="float-right time-icon"
                                    style={{color:showSelectOption && "gray",zIndex:"99"}}
                                    onClick={()=>{!showSelectOption && selectSingleUser(user)}}
                                />
                            </div>
                        </div>
                    )):
                    <div>No Users</div>
                }
            </ContentsWrapper>
            <AsignTimeSheet
                usersSelected={usersSelected}
                isOpen={asignTimeSheet}
                onClose={()=>setAsignTimeSheet(false)}
            />
        </AdminNavBar>
    )
}