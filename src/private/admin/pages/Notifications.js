import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { InputTextarea } from '../../../components/widgets/InputTextarea';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { addNotification } from '../../../database/notifications/NotificationsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { adminRoutes } from '../../../utils/routes/Routes';
import { tools } from '../../../utils/tools/Tools';
import { BiRefresh } from 'react-icons/bi';
import { MdSettingsEthernet } from 'react-icons/md';



export const AdminNotifications = () =>{
    const history = useHistory();

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [infoError, setInfoError] = useState("");
    const [headerError, setHeaderError] = useState("");

    const headerRef = useRef();
    const infoRef = useRef();
    const messageRef = useRef();
    const userToNotifyInfoRef = useRef();

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
            message: messageRef.current.value,
            info: infoRef.current.value
        });
        setLoading(false);
        setSent(true);
    }

    useEffect(()=>{
        if (history.location?.data){
            const data = history.location.data;
            userToNotifyInfoRef.current = data?.user;
            if (data?.type === adminRoutes.logs){
                headerRef.current.value = "Time Log";
                infoRef.current.value = `Discrepancy with time log for ${tools.time.date(data?.value)}`;
                messageRef.current.value = "";
            }
        }
    }, []);

    return(
        <AdminNavBar>
            <div className="float-center notification-container">
                <div className="header" style={{width:"109%",marginBottom:"40px",borderBottom:"1px solid white"}}>Notification</div>
                <div style={{marginBottom:"40px"}}>
                    <InputEntry inputRef={headerRef} label="Header" labelFixed placeholder="Notification type" error={headerError} />
                </div>
                <div style={{marginBottom:"40px"}}>
                    <InputEntry inputRef={infoRef} label="Information" labelFixed placeholder="Information specify to notification" error={infoError} />
                </div>
                <div className="centered" style={{width:"105%",marginLeft:"53%"}}>
                    <InputTextarea inputRef={messageRef} label="Message" labelFixed placeholder="Enter message about your notification here" />
                </div>
                <div style={{marginTop:"20px"}}>
                    <span className="centered" style={{display:!loading && "none"}}>
                        <BiRefresh className="spin" style={{fontSize:"25px",marginBottom:"-5px"}} />
                        <span>{loading && "Sending..."}</span>
                    </span>
                    <span className="centered">{sent && "Notification sent"}</span>
                    <button onClick={onNotify} className="btn btn-hover" style={{float:"right"}}>Send</button>
                </div>
            </div>
        </AdminNavBar>
    )
}