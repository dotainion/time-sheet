import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { InputTextarea } from '../../../components/widgets/InputTextarea';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { addNotification, getNotificationByAuthId, updateNotification } from '../../../database/notifications/NotificationsDb';
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



let uMembers = [];
let DEFAULT_USER_SELECTED = "Select a member";
export const AdminNotifications = () =>{
    const history = useHistory();

    const { user } = useAuth();
    const { notificationList, removeANotifications } = useStore();

    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [infoError, setInfoError] = useState("");
    const [headerError, setHeaderError] = useState("");
    const [members, setMembers] = useState([]);
    const [switchView, setSwitchView] = useState(false);
    const [errorSelect, setErrorSelect] = useState("");
    const [showMessageBox, setShowMessageBox] = useState({state:false, data: null});

    const headerRef = useRef();
    const infoRef = useRef();
    const messageRef = useRef();
    const userToNotifyInfoRef = useRef();

    const onNotify = async() =>{
        let STATE = true;
        setErrorSelect("");
        if (!infoRef.current.value){
            STATE = false;
            setInfoError("No informatin specify");
        }
        if (!headerRef.current.value){
            STATE = false;
            setHeaderError("Invalid header");
        }
        if (!userToNotifyInfoRef.current?.id){
            STATE = false;
            setErrorSelect("No user selected.");
        }

        if (!STATE) return;

        setLoading(true);
        setSent(false);
        await addNotification({
            header: headerRef.current.value,
            from: `(${user?.role}) ${user?.firstName} ${user?.lastName}`,
            id: userToNotifyInfoRef.current?.id,
            message: messageRef.current.value,
            info: infoRef.current.value,
            adminId: user?.id,
            seen: false
        });
        headerRef.current.value = "";
        infoRef.current.value = "";
        messageRef.current.value = "";
        setLoading(false);
        setSent(true);
    }

    const onSelectMember = (id) =>{
        for (let uUser of uMembers){
            if (uUser?.id === id){
                userToNotifyInfoRef.current = uUser;
                break;
            }
        }
    }

    const initUsers = async() =>{
        let tempArray = [];
        uMembers = [];
        for (let mebr of await getUsers(user?.accessId, user?.id)){
            uMembers.push(mebr)
            tempArray.push({
                title: `${mebr?.info?.firstName} ${mebr?.info?.lastName}`,
                value: mebr?.id,
                command: (value) => onSelectMember(value)
            });
        }
        setMembers(tempArray);
    }
    
    const onViewNotification = (data) =>{
        setShowMessageBox({state:true, data});
        if (!data?.info?.seen) updateSeen(data?.id);
    }

    const updateSeen = async(id) =>{
        await updateNotification({seen:true}, id);
        removeANotifications(id);
    }

    useEffect(()=>{
        initUsers();
        if (history.location?.data){
            const data = history.location.data;
            userToNotifyInfoRef.current = data?.user;
            if (data?.type === adminRoutes.logs){
                headerRef.current.value = "Time Log";
                infoRef.current.value = `Discrepancy with time log for ${tools.time.date(data?.value)}`;
                messageRef.current.value = "";
                DEFAULT_USER_SELECTED = `${data?.user?.info?.firstName} ${data?.user?.info?.lastName}`;
            }
        }
    }, []);

    return(
        <AdminNavBar>
            <div className="flex" style={{borderBottom:"1px solid black"}}>
                <IconButton 
                    onClick={()=>setSwitchView(false)} 
                    label="ADD NOTIFICATION" 
                    icon="notification" 
                    cssClass="pad" 
                    border="none" 
                    style={{
                        color:!switchView && "white",
                        backgroundColor:!switchView && "var(--primary-color)"
                    }} />
                <IconButton 
                    onClick={()=>setSwitchView(true)} 
                    label="VIEW NOTIFICATION" 
                    icon="notification" 
                    cssClass="pad" 
                    border="none" 
                    style={{
                        color:switchView && "white",
                        backgroundColor:switchView && "var(--primary-color)"
                    }} />
            </div>
            <div hidden={switchView} className="notification-container">
                <div className="header" style={{width:"105.5%",marginBottom:"20px",marginTop:"20px",borderBottom:"1px solid var(--border)",color:"var(--primary-color)"}}>Notification</div>
                
                <div style={{marginTop:"40px",marginBottom:"40px"}}>
                    <IconSelect icon="users" options={members} defaultValue={DEFAULT_USER_SELECTED} error={errorSelect} errorReset={setErrorSelect} />
                </div>
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
                        <IconButton onClick={onNotify} icon="send" label="Send" />
                    </div>
                </div>
            </div>

            <div hidden={!switchView} style={{backgroundColor:"var(--bg)"}}>
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
                            subMessage="It cant be for knowledge, errors, clarification or areas that needs updating."
                        />
                    }
                </div>
            </div>
            <NotificationBox
                isOpen={showMessageBox.state}
                onClose={()=>setShowMessageBox({state:false, data: null})}
                data={showMessageBox.data}
            />
        </AdminNavBar>
    )
}