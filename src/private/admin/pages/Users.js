import React, { useEffect, useReducer, useRef, useState } from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { Button } from '../../../components/widgets/Buttons';
import { IconButton } from '../../../components/widgets/IconButon';
import { InputCheckbox } from '../../../components/widgets/InputCheckbox';
import { NoRecord } from '../../../components/widgets/NoRecord';
import { SearchBar } from '../../../components/widgets/SearchBar';
import { WidgetsInfo } from '../../../components/widgets/WidgetsInfo';
import { getUser, getUsers } from '../../../database/accounts/AccountsDb';
import { xlFile } from '../../../files/ExcelFile';
import { useAuth } from '../../../state/auth/Authentication';
import { getLogsRange } from '../../../database/logs/LogDb';
import { DateEntry } from '../../../components/widgets/DateEntry';
import defaultImage from '../../../images/default-profile-image.png';
import { LoadingBar } from '../../../components/widgets/LoadingBar';
import { time } from '../../../utils/time/Time';
import { useHistory } from 'react-router';
import { adminRoutes } from '../../../utils/routes/Routes';
import { LandingContent } from '../other/LandingContent';
import { DaysPicker } from '../../../apps/calendar/Calendar';
import { getSchedule } from '../../../database/schedules/SchedulesDb';
import logo from '../../../images/logo.png';
import { UsersListContainer } from '../other/UsersListContainer';
import $ from 'jquery';
import { tools } from '../../../utils/tools/Tools';


export const Users = () =>{
    const history = useHistory();
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState({});
    const [managers, setManagers] = useState([]);
    const [team, setTeam] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [dates, setDates] = useState([]);

    const profileContainerRef = useRef();
    const landingPageRef = useRef();
    const contactRef = useRef();

    const isUser = () =>{
        if (Object.keys(userSelected || {}).length) return true;
        return false;
    }

    const onSchedule = () =>{
        if (!isUser()) return;
        history.push({
            pathname: adminRoutes.schedule, 
            user: userSelected
        });
    }

    const onUpdate = () =>{
        if (!isUser()) return;
        history.push({
            pathname: adminRoutes.profile, 
            user: userSelected
        });
    }

    const getSelectedUserSuperior = async(sUser) =>{
        let sups = [];
        let manager = await getUser(sUser?.info?.accessId);
        let supervisor = await getUser(sUser?.info?.supervisorId);
        if (Object.keys(manager || {}).length){
            manager["title"] = "Managers";
            sups.push(manager);
        }
        if (Object.keys(supervisor || {}).length){
            supervisor["title"] = "Supervisors";
            sups.push(supervisor);
        }
        setManagers(sups);
    }

    const oganizeUserTeamMembers = (sUser) =>{
        let tempTeam = [];
        users.forEach((usr)=>{
            if (usr?.info?.supervisorId === sUser?.info?.supervisorId){
                tempTeam.push(usr);
            }
        });
        setTeam(tempTeam);
    }

    const showContentsDivs = (isTrue) =>{
        if (!isTrue){
            $(profileContainerRef.current).show("slow");
            $(landingPageRef.current).hide("slow");
        }
    }

    const getUserSelectedSchedules = async(sUser) =>{
        const schdArray = await getSchedule(sUser?.id);
        const schedls = schdArray?.daysInWeek?.length && schdArray?.daysInWeek || 
                        schdArray?.daysInMonth?.length && schdArray?.daysInMonth || [];
        let dates = [];
        let rawDates = [];
        schedls.forEach((sch)=>{
            const [week, month, day, year] = sch?.date?.split?.(" ") || {};
            rawDates.push({week, month, day, year});
            dates.push(new Date(sch?.date));
        });
        setDates(rawDates);
        setSchedules(dates);
    }

    const onSelectUser = async(sUser) =>{
        const isUserSelected = Object.keys(userSelected).length? true: false;
        showContentsDivs(isUserSelected);
        setUserSelected(sUser);
        oganizeUserTeamMembers(sUser);
        await getSelectedUserSuperior(sUser);
        await getUserSelectedSchedules(sUser);
    }
    
    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }
    
    useEffect(()=>{
        initUsers();
    }, []);

    return(
        <AdminNavBar useContact>
            <UsersListContainer
                useRefresh
                noMultiSelect
                contactRef={contactRef}
                onSelected={onSelectUser}
            >
                <div className="max-width relative">
                    <div ref={profileContainerRef} className="max-width" style={{display:"none"}}>
                        <div className="flex d-flex-on-mobile" style={{height:"88vh"}}>
                            <div className="user-view-profile">
                                <div style={{padding:"40px"}}>
                                    <img className="user-view-image" src={userSelected?.info?.image || defaultImage} alt="" />
                                    <div className="user-view-contacts">
                                        <div className="header"><b>{userSelected?.info?.firstName} {userSelected?.info?.lastName}</b></div> 
                                        <div>Location</div>
                                        <div>{userSelected?.info?.role}</div>
                                        <div>{userSelected?.info?.email}</div>
                                    </div>
                                    <div className="flex no-wrap">
                                        <IconButton onClick={onUpdate} label="Update" icon="settings" border="none" infoCss="user-view-btn" iconCss="float-left log-header-btn-icon" iconStyle={{left:"5px"}} />
                                        <IconButton onClick={onSchedule} label="Add schedule" icon="calendar" border="none" infoCss="user-view-btn" iconCss="float-left log-header-btn-icon" iconStyle={{left:"5px"}} />
                                    </div>
                                </div>
                            </div>
                            <div className="max-size hide-on-mobile">
                                <div className="user-view-card-container" style={{width:"auto",minWidth:"500px"}}>
                                    <div className="user-view-card">
                                        <div className="header" style={{color:"gray",margin:"20px"}}>Schedules</div>
                                        <div className="flex" style={{paddingLeft:"20px"}}>
                                            <div style={{minWidth:"250px"}}>
                                                <div className="flex" style={{borderBottom:"1px solid var(--border)"}}>
                                                    <div className="max-width">week</div>
                                                    <div className="max-width">month</div>
                                                    <div className="max-width">day</div>
                                                    <div className="max-width">year</div>
                                                    <div style={{width:"70px"}}/>
                                                </div>
                                                <div style={{overflowY:"scroll",height:"32vh"}}>
                                                    {dates.map((date, key)=>(
                                                        <div className="flex" key={key}>
                                                            <div className="user-vew-date-grid">{date?.week}</div>
                                                            <div className="user-vew-date-grid">{date?.month}</div>
                                                            <div className="user-vew-date-grid">{date?.day}</div>
                                                            <div className="user-vew-date-grid">{date?.year}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="relative" style={{marginLeft:"20px"}}>
                                                <DaysPicker defaultDates={schedules} viewOnly style={{border:"none"}} />
                                                <div className="float-center max-width" style={{height:"65%"}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex" >
                                    <div className="user-view-card-container">
                                        <div className="user-view-card" >
                                            <div className="user-view-card-info">
                                                {managers?.map((sup, key)=>(
                                                    <div key={key}>
                                                        <div className="header" style={{marginBottom:"10px",color:"gray"}}><b>{sup?.title}</b></div>
                                                        <div className="user-view-admin-conainter">
                                                            <div><img src={sup?.image || defaultImage} alt="" /></div>
                                                            <div style={{marginLeft:"5px",color:"darkgray"}}>
                                                                <div><b>{sup?.firstName} {sup?.lastName}</b></div>
                                                                <div style={{color:"gray"}}>{sup?.role}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="user-view-card-container">
                                        <div className="user-view-card" >
                                            <div className="user-view-card-info">
                                                <div className="header" style={{marginBottom:"10px",color:"gray"}}><b>Team members</b></div>
                                                {team?.map((usr, key)=>(
                                                    <div onClick={()=>onSelectUser(usr)} style={{cursor:"pointer"}} key={key}>
                                                        <div className="user-view-admin-conainter">
                                                            <div><img src={usr?.info?.image || defaultImage} alt="" style={{width:"30px",height:"30px"}} /></div>
                                                            <div style={{fontSize:"12px",marginLeft:"5px",color:"gray"}}>
                                                                <div><b>{usr?.info?.firstName} {usr?.info?.lastName}</b></div>
                                                                <div style={{fontSize:"9px",color:"gray"}}>{usr?.info?.role}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <LandingContent landingRef={landingPageRef} />
            </UsersListContainer>
        </AdminNavBar>
    )
}

