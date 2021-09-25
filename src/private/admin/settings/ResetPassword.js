import React, { useEffect, useRef, useState } from 'react';
import { Backdrop } from '../../../container/Backdrop';
import { SpanWrapper } from '../../../container/SpanWrapper';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';


export const ResetPassword = ({isOpen, onClose}) =>{
    const { user, resetPasswordViaEmail } = useAuth();

    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [agentSelected, setAgentSelected] = useState({});

    const sendViaEmailRef = useRef();

    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }

    const onAgentSelected = (agent) =>{
        setAgentSelected(agent);
        setShowUsers(false);
        setShowResetPassword(true);
        sendViaEmailRef.current.value = agent?.info?.email;
    }

    const onResetViaEmail = async() =>{
        await resetPasswordViaEmail(sendViaEmailRef.current.value);
    }

    const onBackToUsersList = () =>{
        setAgentSelected({});
        setShowResetPassword(false);
        setShowUsers(true);
    }

    useEffect(()=>{
        if (isOpen){
            setShowUsers(true);
            setShowResetPassword(false);
        }
    }, [isOpen]);

    useEffect(()=>{
        initUsers();
    }, []);
    return(
        <Backdrop isOpen={isOpen}>
            {/* view list of users */}
            <SpanWrapper isOpen={showUsers} onClose={onClose} shadow>
                <div className="pad" style={{maxHeight:"500px",overflowY:"auto"}}>
                    <div className="pad" style={{color:"var(--primary-color)",borderBottom:"1px solid var(--primary-color)"}}><b>Users list</b></div>
                    <div className="pad">
                        {
                            users?.length?
                            users?.map((agent, key)=>(
                                <div onClick={()=>onAgentSelected(agent)} className="flex item-hover" style={{borderBottom:"1px solid var(--border)",cursor:"pointer",padding:"5px"}} key={key}>
                                    <div className="max-width" style={{minWidth:"150px"}}><b>{`${agent?.info?.firstName} ${agent?.info?.lastName}`}</b></div>
                                    <div style={{minWidth:"150px"}} className="max-width">Role: {agent?.info?.role}</div>
                                </div>
                            )):
                            <div>No records found.</div>
                        }
                    </div>
                </div>
            </SpanWrapper>

            {/* to reset users password */}
            <SpanWrapper isOpen={showResetPassword} onClose={onClose} shadow>
                <div className="pad" style={{width:"300px"}}>
                    <div className="pad" style={{color:"white"}}>
                        <div style={{color:"orange",borderBottom:"1px solid var(--border)"}}><b>Reset password</b></div>
                        <div>{`${agentSelected?.info?.firstName || ""} ${agentSelected?.info?.lastName || ""}`}</div>
                        <p style={{fontSize:"13px",color:"orangered"}}>A email will be sent to {agentSelected?.info?.email} with information on how to reset the account</p>
                    </div>
                    <div className="centered" style={{width:"270px"}}>
                        <input ref={sendViaEmailRef} className="input no-select" style={{width:"260px",backgroundColor:"white",cursor:"text"}} />
                    </div>
                    <div className="pad" style={{textAlign:"right"}}>
                        <button onClick={onBackToUsersList} className="btn btn-hover" style={{marginRight:"10px"}}>Back</button>
                        <button onClick={onResetViaEmail} className="btn btn-hover">Send</button>
                    </div>
                </div>
            </SpanWrapper>
        </Backdrop>
    )
}