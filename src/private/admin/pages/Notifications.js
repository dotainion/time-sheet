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
import { MdSettingsEthernet } from 'react-icons/md';
import { IconSelect } from '../../../components/widgets/IconSelect';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { NotificationLogs } from '../../../components/widgets/NotificationLogs';
import { MessageBox } from '../../../components/widgets/MessageBox';
import { NotificationBox } from '../../../components/widgets/NotificationBox';
import { NoRecord } from '../../../components/widgets/NoRecord';


let uMembers = [];
let DEFAULT_USER_SELECTED = "Select a member";
export const AdminNotifications = () =>{
    const history = useHistory();

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [infoError, setInfoError] = useState("");
    const [headerError, setHeaderError] = useState("");
    const [members, setMembers] = useState([]);
    const [notification, setNotification] = useState([]);
    const [notificationContainAll, setNotificationContainAll] = useState([]);
    const [switchView, setSwitchView] = useState(false);
    const [showMessageBox, setShowMessageBox] = useState(false);

    const headerRef = useRef();
    const infoRef = useRef();
    const messageRef = useRef();
    const userToNotifyInfoRef = useRef();
    const notificationSelected = useRef();

    const navOption = [[
        {title:"Add Notification", command:()=>setSwitchView(false)},
        {title:"View Notification", command:()=>setSwitchView(true)}
    ]];

    const onNotify = async() =>{
        let STATE = true;
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
            alert("No user selected");
        }

        if (!STATE) return;

        setLoading(true);
        setSent(false);
        await addNotification({
            header: headerRef.current.value,
            from: `(${user?.role}) ${user?.firstName} ${user?.lastName}`,
            id: userToNotifyInfoRef.current?.id,
            adminMessage: [{
                msg: messageRef.current.value,
                date: tools.time.digits()
            }],
            userMessage: [],
            info: infoRef.current.value,
            adminId: user?.id,
            userSeen: false,
            adminSeen: true
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

    const filterNotification = () =>{
        let noticeArray = [];
        for (let notice of notificationContainAll){

        }
        setNotification(noticeArray);
    }

    const initNotifications = async() =>{
        const noticeRecords = await getNotificationByAuthId(user?.id);
        setNotificationContainAll(noticeRecords);
        setNotification(noticeRecords);
    }

    const onShowMessageBox = (notificationObj) =>{
        setShowMessageBox(true);
        notificationSelected.current = notificationObj;
    }

    const toggleMore = (id, state) =>{
        document.getElementById(id).hidden = state;
        document.getElementById(`${id}btn`).hidden = !state;
    }

    useEffect(()=>{
        initUsers();
        initNotifications();
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
        <AdminNavBar options={navOption}>
            <div hidden={switchView} className="float-center notification-container">
                <div className="float-top-right notification-user-select">
                    <IconSelect icon="people" options={members} defaultValue={DEFAULT_USER_SELECTED} />
                </div>
                <div className="header" style={{width:"109%",marginBottom:"40px",borderBottom:"1px solid white"}}>Notification</div>
                <div style={{marginBottom:"40px"}}>
                    <InputEntry inputRef={headerRef} label="Header" labelFixed placeholder="Notification type" error={headerError} errorReset={setHeaderError} />
                </div>
                <div style={{marginBottom:"40px"}}>
                    <InputEntry inputRef={infoRef} label="Information" labelFixed placeholder="Information specify to notification" error={infoError} errorReset={setInfoError} />
                </div>
                <div className="centered" style={{width:"105%",marginLeft:"53%"}}>
                    <InputTextarea inputRef={messageRef} label="Message" labelFixed placeholder="Enter message about your notification here" />
                </div>
                <div className="relative" style={{marginTop:"20px"}}>
                    <span className="float-center" style={{display:!loading && "none"}}>
                        <BiRefresh className="spin" style={{fontSize:"25px",marginBottom:"-5px"}} />
                        <span>{loading && "Sending..."}</span>
                    </span>
                    <span className="float-center">{sent && "Notification sent"}</span>
                    <button onClick={onNotify} className="btn btn-hover" style={{float:"right"}}>Send</button>
                </div>
            </div>

            <div hidden={!switchView} className="max-size" style={{backgroundColor:"rgb(243, 243, 243)",height:"94vh"}}>
                <div className="centered scrollbar" style={{height:"92vh"}}>
                    {
                        notification.length?
                        notification.map((notice, key)=>(
                            <NotificationLogs
                                header={notice?.info?.header}
                                from={notice?.info?.from}
                                info={notice?.info?.info}
                                adminMessage={notice?.info?.adminMessage}
                                userMessage={notice?.info?.userMessage}
                                moreId={`user-notif${key}btn`}
                                lessId={`user-notif${key}`}
                                onShowMore={()=>toggleMore(`user-notif${key}`,false)}
                                onShowLess={()=>toggleMore(`user-notif${key}`,true)}
                                onAdd={()=>onShowMessageBox(notice)}
                                key={key}
                            />
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
                useAdmin
                isOpen={showMessageBox}
                onClose={()=>setShowMessageBox(false)}
                notifySelected={notificationSelected.current}
            />
        </AdminNavBar>
    )
}