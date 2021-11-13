import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { InputTextarea } from '../../../components/widgets/InputTextarea';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { addNotification, updateNotification } from '../../../database/notifications/NotificationsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { adminRoutes } from '../../../utils/routes/Routes';
import { tools } from '../../../utils/tools/Tools';
import { BiRefresh } from 'react-icons/bi';
import { IconSelect } from '../../../components/widgets/IconSelect';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { NotificationBox } from '../../../components/widgets/NotificationBox';
import { NoRecord } from '../../../components/widgets/NoRecord';
import { TiArrowBack } from 'react-icons/ti';
import { WidgetsInfo } from '../../../components/widgets/WidgetsInfo';
import { MdNotificationsActive } from 'react-icons/md';
import { IconButton } from '../../../components/widgets/IconButon';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { UsersListContainer } from '../other/UsersListContainer';
import { LoadingBar } from '../../../components/widgets/LoadingBar';
import { time } from '../../../utils/time/Time';


let DEFAULT_USER_SELECTED = "";
export const AdminNotifications = () =>{
    const history = useHistory();

    const { user } = useAuth();
    const { notificationList, removeANotifications, sentNotificationList } = useStore();

    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [infoError, setInfoError] = useState("");
    const [headerError, setHeaderError] = useState("");
    const [members, setMembers] = useState([]);
    const [switchView, setSwitchView] = useState({campaigns:true,notifications:false,myNotification:false});
    const [showMessageBox, setShowMessageBox] = useState({state:false, data: null});

    const headerRef = useRef();
    const infoRef = useRef();
    const messageRef = useRef();

    const onNotify = async(uUsers) =>{
        let STATE = true;
        if (!infoRef.current.value){
            STATE = false;
            setInfoError("No informatin specify");
        }
        if (!headerRef.current.value){
            STATE = false;
            setHeaderError("Invalid header");
        }

        if (!STATE) return;

        setSent(false);
        setLoading(true);
        for (let uUser of members){
            await addNotification({
                header: headerRef.current.value,
                from: `(${user?.role}) ${user?.firstName} ${user?.lastName}`,
                id: uUser?.id,
                message: messageRef.current.value,
                info: infoRef.current.value,
                adminId: user?.id,
                seen: false
            });
        }
        headerRef.current.value = "";
        infoRef.current.value = "";
        messageRef.current.value = "";
        setSent(true);
        setLoading(false);
    }
    
    const onViewNotification = (data) =>{
        setShowMessageBox({state:true, data});
        if (!data?.info?.seen) updateSeen(data?.id);
    }

    const updateSeen = async(id) =>{
        await updateNotification({seen:true}, id);
        removeANotifications(id);
    }

    const getMyNotification = () =>{
        
    }

    useEffect(()=>{
        //NOTE: notification no longer being used
        // this is statement is not being used...
        if (history.location?.data){
            const data = history.location.data;
            setMembers([data?.user]);
            if (data?.type === adminRoutes.logs){
                headerRef.current.value = "Time Log";
                infoRef.current.value = `Discrepancy with time log for ${time.toDateString(data?.value)}`;
                messageRef.current.value = "";
                DEFAULT_USER_SELECTED = `${data?.user?.info?.firstName} ${data?.user?.info?.lastName}`;
            }
        }
    }, []);

    return(
        <AdminNavBar useContact>
            <UsersListContainer
                onSelected={async(uUser)=>setMembers([uUser])}
                onMultiSelected={setMembers}
                toolbar={[
                    {action:()=>setSwitchView({campaigns:true,notifications:false,myNotification:false}),title:"PUSH CAMPAIGNS",border:"none",css:"item-hover",style:{color:switchView.campaigns && "white",backgroundColor:switchView.campaigns && "var(--primary-color)",padding:"10px"}},
                    {action:()=>setSwitchView({campaigns:false,notifications:true,myNotification:false}),title:"VIEW NOTIFICATION",border:"none",css:"item-hover",style:{color:switchView.notifications && "white",backgroundColor:switchView.notifications && "var(--primary-color)",padding:"10px"}},
                    {action:()=>setSwitchView({campaigns:false,notifications:false,myNotification:true}),title:"NOTIFICATION SENT",border:"none",css:"item-hover",style:{color:switchView.myNotification && "white",backgroundColor:switchView.myNotification && "var(--primary-color)",padding:"10px"}},
                    {action:()=>history.push(adminRoutes.requests),title:"REQUESTS",border:"none",css:"item-hover",style:{padding:"10px"}}
                ]}
            >
                
                <div hidden={!switchView.campaigns} className="notification-container">
                    <div className="header" style={{width:"105.5%",marginBottom:"20px",marginTop:"20px",borderBottom:"1px solid var(--border)",color:"var(--primary-color)"}}>Push Campaigns</div>
                    <div className="notification-sub-container">
                        <InputEntry inputRef={headerRef} label="Header" labelFixed placeholder="Notification type" error={headerError} errorReset={setHeaderError} />
                    </div>
                    <div className="notification-sub-container">
                        <InputEntry inputRef={infoRef} label="Information" labelFixed placeholder="Information specify to notification" error={infoError} errorReset={setInfoError} />
                    </div>
                    <div className="notification-sub-container">
                        <InputTextarea inputRef={messageRef} label="Message" labelFixed placeholder="Enter message about your notification here" />
                    </div>
                    <div className="relative">
                        <span className="float-center" style={{display:!loading && "none"}}>
                            <BiRefresh className="spin" style={{fontSize:"25px",marginBottom:"-5px"}} />
                            <span>{loading && "Sending..."}</span>
                        </span>
                        <span className="float-center">{sent && "Notification sent"}</span>
                        <div style={{textAlign:"right"}}>
                            <IconButton onClick={onNotify} icon="send" label="Send" style={{color:"var(--primary-color)",borderColor:"var(--primary-color)",padding:"5px",width:"100px"}} />
                        </div>
                    </div>
                </div>

                <div hidden={!switchView.notifications} style={{backgroundColor:"var(--bg)"}}>
                    <div style={{height:"88vh",overflowY:"auto"}}>
                        {
                            notificationList.length?
                            notificationList.map((notice, key)=>(
                                <div className="notification-item-container" key={key}>
                                    <div onClick={()=>onViewNotification(notice)} className="notification-item">
                                        <div onClick={e=>e.stopPropagation()} className="notification-item-count">
                                            <div className="float-center">{key+1}</div>
                                        </div>
                                        <div className="float-center">
                                            <div className="relative" style={{color:"var(--primary-color)"}}><b>{notice?.info?.header}</b></div>
                                            <div>{notice?.info?.from}</div>
                                        </div>
                                    </div>
                                </div>
                            )):
                            <NoRecord 
                                icon="notification"
                                header="No notification" 
                                message="Notification provides details to spesific information." 
                                subMessage="It can be for knowledge, errors, clarification or areas that needs updating."
                            />
                        }
                    </div>
                </div>

                <div hidden={!switchView.myNotification} style={{backgroundColor:"var(--bg)"}}>
                    <div style={{height:"88vh",overflowY:"auto"}}>
                        {
                            sentNotificationList.length?
                            sentNotificationList.map((notice, key)=>(
                                <div className="notification-item-container" key={key}>
                                    <div onClick={()=>onViewNotification(notice)} className="notification-item">
                                        <div onClick={e=>e.stopPropagation()} className="notification-item-count">
                                            <div className="float-center">{key+1}</div>
                                        </div>
                                        <div className="float-center">
                                            <div className="relative" style={{color:"var(--primary-color)"}}><b>{notice?.info?.header}</b></div>
                                            <div>{notice?.info?.from}</div>
                                        </div>
                                    </div>
                                </div>
                            )):
                            <NoRecord 
                                icon="notification"
                                header="No notification" 
                                message="Notification provides details to spesific information." 
                                subMessage="It can be for knowledge, errors, clarification or areas that needs updating."
                            />
                        }
                    </div>
                </div>
                <NotificationBox
                    isOpen={showMessageBox.state}
                    onClose={()=>setShowMessageBox({state:false, data: null})}
                    data={showMessageBox.data}
                />
                <LoadingBar isOpen={loading} />
            </UsersListContainer>
        </AdminNavBar>
    )
}