import React, { useEffect, useRef, useState } from 'react';
import { SearchBar } from '../../components/widgets/SearchBar';
import { Profile } from '../../components/other/Profile';
import { useAuth } from '../../state/auth/Authentication';
import { addMessage, getContacts, messageObserver } from '../../database/messages/MessagesDb';
import { MdSend } from 'react-icons/md';
import { tools } from '../../utils/tools/Tools';
import { NoRecord } from '../../components/widgets/NoRecord';
import { FiLoader } from 'react-icons/fi';
import $ from 'jquery';
import { time } from '../../utils/time/Time';


export const Messages = () =>{
    const { user } = useAuth();

    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [msgError, setMsgError] = useState(false);
    const [userSelected, setUserSelected] = useState({});
    const [hideWhenMobile, setHideWhenMobile] = useState("hide-on-mobile");

    const searchRef = useRef();
    const messageRef = useRef();
    const msgContainerRef = useRef();

    const onSend = async() =>{
        setMsgError(false);
        if (!messageRef.current.value){
            return setMsgError(true);
        }
        addMessage({
            from: user?.id,
            to: userSelected?.id,
            date: time.toDigits(),
            message: messageRef.current.value,
            bindId: tools.bindId(user?.id, userSelected?.id)
        });
        messageRef.current.value = "";
    }

    const onSearchMembers = () =>{
        let contactTemp = [];
        if (!searchRef.current.value) return;
        for  (let contact of contacts){
            if (contact?.info?.firstName?.toLowerCase()?.includes?.(searchRef.current.value?.toLowerCase()) ||
                contact?.info?.lastName?.toLowerCase()?.includes?.(searchRef.current.value?.toLowerCase()) ||
                contact?.info?.email?.toLowerCase()?.includes?.(searchRef.current.value?.toLowerCase())){
                contactTemp.push(contact);
            }
        }
        setSearchResults(contactTemp);
    }

    const clearSearchResults = () =>{
        searchRef.current.value = "";
        setSearchResults([]);
    }

    const onSelectUser = (contact, id) =>{
        if (userSelected?.id !== contact?.id){
            setUserSelected(contact);
            setMsgError(false);
            document.getElementById(id).style.display = "block";
            document.getElementById(id).style.display = "none";
            setHideWhenMobile("");
        }
        clearSearchResults();
    }

    const initContacts = async() =>{
        const contacts = await getContacts(user?.accessId);
        setContacts(contacts.filter((contact)=>!contact?.id?.includes(user?.id)));
    }

    useEffect(()=>{
        initContacts();
    }, []);

    useEffect(()=>{
        messageObserver(
            tools.bindId(user?.id, userSelected?.id), 
            (obj)=>{
                setMessages(time.sort(obj));
                msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
            }
        );
    }, [userSelected]);

    return(
        <div>
            <div className="flex msg-main-container">
                <div hidden={!contacts.length} className="msg-contact-container">
                    <div style={{padding:"10px",backgroundColor:"var(--primary-color)",color:"white",paddingBottom:"10px",marginBottom:"10px"}}>
                        <Profile
                            floatLeft
                            firstName={user?.firstName}
                            lastName={user?.lastName}
                            role={user?.role}
                        />
                        <SearchBar onTyping={onSearchMembers} searchRef={searchRef} cssClass="centered" style={{marginTop:"20px"}} />
                    </div>
                    <div style={{height:"71vh"}}>
                        <div
                            style={{
                                display:!searchResults.length && "none",
                                marginBottom:"20px",
                                borderBottom:"2px solid dodgerblue"
                            }}>
                            {
                                searchResults.length?
                                searchResults.map((contact, key)=>(
                                    <Profile
                                        floatLeft
                                        info={false}
                                        cssClass="item-hover"
                                        firstName={contact?.info?.firstName}
                                        lastName={contact?.info?.lastName}
                                        role={contact?.info?.role}
                                        onClick={()=>onSelectUser(contact, contact?.id)}
                                        style={{width:"100%",cursor:"pointer"}}
                                        key={key}
                                    />
                                )):
                                <div className="pad" style={{display:!searchRef.current?.value && "none"}}>
                                    <label>No results found for your search</label>
                                </div>
                            }
                        </div>
                        {
                            contacts.length?
                            contacts.map((contact, key)=>(
                                <div 
                                    onClick={()=>onSelectUser(contact, contact?.id)}
                                    style={{borderBottom:"1px solid var(--border)",padding:"3px"}} 
                                    className="relative" 
                                    key={key}
                                >
                                    <Profile
                                        floatLeft
                                        info={false}
                                        cssClass="item-hover"
                                        firstName={contact?.info?.firstName}
                                        lastName={contact?.info?.lastName}
                                        image={contact?.info?.image}
                                        role={contact?.info?.role}
                                        style={{backgroundColor:userSelected?.id === contact?.id && "var(--border-focus)",cursor:"pointer",width:"100%"}}
                                    />
                                    <div id={contact?.id} className="float-right" style={{right:"15px",display:"none"}} >
                                        <FiLoader className="spiner"/>
                                    </div>
                                </div>
                            )):
                            <div>No contacts</div>
                        }
                    </div>
                </div>
                <div className={`msg-container ${hideWhenMobile}`} style={{width:!contacts.length && "100%"}}>
                    <div hidden={!contacts.length} className="relative" style={{backgroundColor:"var(--primary-color)",padding:"15px",color:"white"}}>
                        <Profile
                            floatLeft
                            onBack={()=>setHideWhenMobile("hide-on-mobile")}
                            firstName={userSelected?.info?.firstName}
                            lastName={userSelected?.info?.lastName}
                            role={userSelected?.info?.role}
                        />
                        <div
                            className="float-center max-size"
                            style={{
                                backgroundColor:"var(--primary-color)",
                                display:Object.keys(userSelected || {}).length && "none"
                            }}
                        />
                    </div>
                    <div 
                        className="scrollbar pad relative" 
                        style={{
                            height: "67vh",
                            backgroundColor: "rgb(233, 231, 231)",
                            paddingTop: "10px",
                            overflowY: "auto"
                        }} 
                        ref={msgContainerRef}>
                        {
                            messages.length?
                            messages.map((message, key)=>(
                                <div className="msg-content" style={{textAlign: message?.info?.from === user?.id?"right":"left"}} key={key}>
                                    <div className={`msg-inner-content ${message?.info?.from === user?.id?"msg-right":"msg-left"}`}>
                                        <span>{message?.info?.message}</span>
                                        <div
                                            className="float-top-right" 
                                            style={{
                                                fontSize:"8px",
                                                paddingRight:"5px"
                                            }}>{time.toTimeString(message?.info?.date)}</div>
                                    </div>
                                </div>
                            )):
                            <div>
                                {contacts.length?
                                    <>
                                        <div style={{display:!Object.keys(userSelected || {}).length && "none"}}>
                                            <NoRecord
                                                icon="message"
                                                header="No message"
                                                message={`Send your fist message to ${userSelected?.info?.firstName} ${userSelected?.info?.lastName},`}
                                                subMessage="and let him/her knows of the issue you are having."
                                            />
                                        </div>
                                        <div style={{display:Object.keys(userSelected || {}).length && "none"}}>
                                            <NoRecord
                                                icon="users"
                                                header="No contact selected"
                                                message="To start a new conversation Select a contact from your list."
                                                subMessage="Stay connected, stay in touch."
                                            />
                                        </div>
                                    </>:
                                    <NoRecord
                                        icon="users"
                                        header="You have no contacts"
                                        message="If you are not an administrator and positive there is members under this administration,"
                                        subMessage=" then contact your administrator or add contacts by going to {ADD USERS) tab."
                                    />
                                }
                            </div>
                        }
                    </div>
                    <div
                        style={{
                            backgroundColor:Object.keys(userSelected || {}).length
                                ?"lightgray"
                                : "rgb(233, 231, 231)",
                            padding:"15px"
                        }}>
                        <div className="relative centered msg-send-box" >
                            <SearchBar 
                                searchRef={messageRef}
                                placeholder="Type a message"
                                parentStyle={{
                                    width:"100%"
                                }}
                                style={{
                                    width:"100%",
                                    padding:"12px",
                                    border:msgError && "1px solid red"
                                }}
                                onTyping={(key)=>{
                                    if (key === "Enter") onSend();
                                    else setMsgError(false);
                                }}
                            />
                            <MdSend onClick={onSend}className="msg-send-btn"/>
                            <div
                                className="float-center max-size"
                                style={{
                                    backgroundColor:"rgb(233, 231, 231)",
                                    display:Object.keys(userSelected || {}).length && "none"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}