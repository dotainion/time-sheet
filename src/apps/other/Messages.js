import React, { useEffect, useRef, useState } from 'react';
import { SearchBar } from '../../components/widgets/SearchBar';
import { Profile } from './Profile';
import { useAuth } from '../../state/auth/Authentication';
import { addMessage, getContacts, getMessages } from '../../database/messages/Messages';
import { MdSend } from 'react-icons/md';
import { tools } from '../../utils/tools/Tools';


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

    const onSend = async() =>{
        setMsgError(false);
        if (!messageRef.current.value){
            return setMsgError(true);
        }
        addMessage({
            from: user?.id,
            to: userSelected?.id,
            date: tools.time.digits(),
            message: messageRef.current.value
        });
        setMessages([
            ...messages,
            {info:{
                message: messageRef.current.value,
                from: user?.id
            }}
        ]);
        messageRef.current.value = "";
    }

    const onSearch = () =>{
        let contactTemp = [];
        if (searchRef.current.value){
            for  (let contact of contacts){
                if (contact?.info?.firstName?.toLowerCase()?.includes?.(searchRef.current.value?.toLowerCase()) ||
                    contact?.info?.lastName?.toLowerCase()?.includes?.(searchRef.current.value?.toLowerCase()) ||
                    contact?.info?.email?.toLowerCase()?.includes?.(searchRef.current.value?.toLowerCase())){
                    contactTemp.push(contact);
                }
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
            initUserMessages(contact, id);
        }
        clearSearchResults();
    }

    const initUserMessages = async(uUser, id) =>{
        setMsgError(false);
        document.getElementById(id).style.display = "block";
        setMessages(await getMessages(user?.id, uUser?.id));
        document.getElementById(id).style.display = "none";
        setHideWhenMobile("");
    }

    const initContacts = async() =>{
        const contacts = await getContacts(user?.accessId);
        setContacts(contacts.filter((contact)=>!contact?.id?.includes(user?.id)));
    }

    useEffect(()=>{
        initContacts();
    }, []);

    return(
        <div>
            <div className="flex msg-main-container">
                <div className={`msg-contact-container`}>
                    <div style={{backgroundColor:"lightgray",paddingBottom:"10px",marginBottom:"10px"}}>
                        <Profile
                            style={{
                                background:"var(--bg-fade-horizontal)",
                                marginBottom:"10px",
                                color:"white"
                            }} 
                            firstName={user?.firstName}
                            lastName={user?.lastName}
                            msg={user?.role}
                        />
                        <SearchBar onTyping={onSearch} searchRef={searchRef} />
                    </div>
                    <div className="scrollbar" style={{height:"71vh"}}>
                        <div
                            style={{
                                display:!searchResults.length && "none",
                                backgroundColor:"lightblue",marginBottom:"20px",
                                borderBottom:"2px solid dodgerblue"
                            }}>
                            {
                                searchResults.length?
                                searchResults.map((contact, key)=>(
                                    <Profile
                                        pointer
                                        firstName={contact?.info?.firstName}
                                        lastName={contact?.info?.lastName}
                                        onClick={()=>onSelectUser(contact, contact?.id)}
                                        loaderId={contact?.id}
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
                                <Profile
                                    pointer
                                    firstName={contact?.info?.firstName}
                                    lastName={contact?.info?.lastName}
                                    onClick={()=>onSelectUser(contact, contact?.id)}
                                    style={{backgroundColor:userSelected?.id === contact?.id && "lightgray"}}
                                    loaderId={contact?.id}
                                    key={key}
                                />
                            )):
                            <div>No contacts</div>
                        }
                    </div>
                </div>
                <div className={`msg-container ${hideWhenMobile}`}>
                    <div className="relative">
                        <Profile
                            style={{
                                background:"var(--bg-fade-horizontal-reverse)",
                                color:"white",
                                paddingLeft:"10px"
                            }}
                            onBack={()=>setHideWhenMobile("hide-on-mobile")}
                            firstName={userSelected?.info?.firstName}
                            lastName={userSelected?.info?.lastName}
                            msg={userSelected?.info?.role}
                        />
                        <div
                            className="float-center max-size"
                            style={{
                                backgroundColor:"rgb(233, 231, 231)",
                                display:Object.keys(userSelected || {}).length && "none"
                            }}
                        />
                    </div>
                    <div 
                        className="scrollbar pad relative" 
                        style={{
                            height:"67vh",
                            backgroundColor:"rgb(233, 231, 231)",
                            paddingTop:"10px"
                        }}>
                        {
                            messages.length?
                            messages.map((message, key)=>(
                                <div className="msg-content" key={key}>
                                    <div className={
                                            message?.info?.from === user?.id
                                            ?"msg-content-right"
                                            :"msg-content-left"
                                        }>
                                        <span>{message?.info?.message}</span>
                                    </div>
                                </div>
                            )):
                            <div>
                                <div style={{display:!Object.keys(userSelected || {}).length && "none"}}>
                                    <div>No messages</div>
                                </div>
                                <div style={{display:Object.keys(userSelected || {}).length && "none"}}>
                                    <div className="float-center">
                                        <p>some information about what ever</p>
                                    </div>
                                </div>
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
                        <div 
                            className="relative centered msg-send-box"
                            >
                            <SearchBar 
                                searchRef={messageRef}
                                placeholder="Type a message"
                                style={{
                                    padding:"12px",
                                    border:msgError && "1px solid red"
                                }}
                                onTyping={(key)=>{
                                    if (key === "Enter") onSend();
                                    else setMsgError(false);
                                }}
                            />
                            <MdSend 
                                className="float-right msg-send-btn"
                                onClick={onSend}
                            />
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