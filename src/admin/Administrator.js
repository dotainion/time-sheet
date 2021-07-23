import React, { useEffect, useState } from 'react';
import { AdminNavBar } from './AdminNavBar';
import { AddUser } from './pages/AddUser';
import { Logs } from './pages/Logs';
import { Settings } from './pages/Settings';
import { Users } from './pages/Users';
import { Welcome } from './pages/Welcome';
import { getUsers } from '../database/dbActions';

export const Administrator = () =>{
    const [users, setUsers] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);

    const navigations = [
        {
            title: "ADD USERS",
            state: showAddUser,
            action: setShowAddUser
        },{
            title: "VIEW USERS",
            state: showUsers,
            action: setShowUsers
        },{
            title: "VIEW LOGS",
            state: showLogs,
            action: setShowLogs
        },{
            title: "SETTINGS",
            state: showSettings,
            action: setShowSettings
        },
    ];

    const resetAll = () =>{
        setShowAddUser(false);
        setShowUsers(false);
        setShowLogs(false);
        setShowSettings(false);
        setShowWelcome(false);
    }

    const initUsers = async() =>{
        setUsers(await getUsers());
    }

    useEffect(()=>{
        initUsers();
    },[]);
    return(
        <AdminNavBar onBeforeClick={resetAll} navigations={navigations}>
            <AddUser isOpen={showAddUser} />
            <Users isOpen={showUsers} members={users} />
            <Logs isOpen={showLogs} members={users} />
            <Settings isOpen={showSettings} />
            <Welcome isOpen={showWelcome} />
        </AdminNavBar>
    )
}