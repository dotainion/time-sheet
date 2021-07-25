import React, { useEffect, useState } from 'react';
import { AddUser } from './pages/AddUser';
import { Logs } from './pages/Logs';
import { Settings } from './pages/Settings';
import { Users } from './pages/Users';
import { Welcome } from './pages/Welcome';
import { getUsers } from '../database/dbActions';
import { AdminNavBar } from '../container/AdminNavBar';
import { adminNavs } from '../contents/lists';

export const Administrator = () =>{
    const [users, setUsers] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);

    

    const set = (state) =>{
        setShowAddUser(state);
        setShowUsers(state);
        setShowLogs(state);
        setShowSettings(state);
        setShowWelcome(state);
    }

    const pageAction = (cmd) =>{
        set(false);
        if (cmd === adminNavs[0]?.title) setShowAddUser(true);
        if (cmd === adminNavs[1]?.title) setShowUsers(true);
        if (cmd === adminNavs[2]?.title) setShowLogs(true);
        if (cmd === adminNavs[3]?.title) setShowSettings(true);
    }

    const initUsers = async() =>{
        setUsers(await getUsers());
    }

    useEffect(()=>{
        initUsers();
    },[]);
    return(
        <AdminNavBar onClick={pageAction}>
            <AddUser isOpen={showAddUser} />
            <Users isOpen={showUsers} members={users} />
            <Logs isOpen={showLogs} members={users} />
            <Settings isOpen={showSettings} />
            <Welcome isOpen={showWelcome} />
        </AdminNavBar>
    )
}