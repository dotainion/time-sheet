import React, { useEffect, useState, useRef } from 'react';
import { } from 'react/cjs/react.development';
import { InputCheckbox } from '../../../components/widgets/InputCheckbox';
import { SearchBar } from '../../../components/widgets/SearchBar';
import { WidgetsInfo } from '../../../components/widgets/WidgetsInfo';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import defaultImage from '../../../images/default-profile-image.png';
import { IconButton } from '../../../components/widgets/IconButon';
import { EllipsisMenu } from '../../../components/widgets/EllipsisMenu';
import { LoadingBar } from '../../../components/widgets/LoadingBar';
import { tools } from '../../../utils/tools/Tools';
import $ from 'jquery';
import { CONTACT_ID } from '../../../contents/GlobalId';


let muliUserIds = [];
let checkboxIds = [];
export const UsersListContainer = ({toolbar, menu, onChecked, noMultiSelect, onSelected, onMultiSelected, useRefresh, refreshId, children}) =>{
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [showOption, setShowOption] = useState(false);
    const [multipleUsers, setMultipleUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const singleUserSelectedRef = useRef();
    const searchRef = useRef();

    const onSearch = () =>{
        let likeUser = [];
        let unlikeUser =[];
        for (let uUser of users){
            const search = searchRef.current.value;
            if (
                uUser?.info?.firstName?.toLowerCase?.()?.includes?.(search.toLowerCase?.()) || 
                uUser?.info?.lastName?.toLowerCase?.()?.includes?.(search.toLowerCase?.())
            ){
                likeUser.push(uUser);
            }else{
                unlikeUser.push(uUser);
            }
        }
        setUsers([...likeUser, ...unlikeUser])
    }

    const onTriggerSingleSelected = async(uUser) =>{
        if (!multipleUsers.length){
            setLoading(true);
            togglePage();
            singleUserSelectedRef.current = uUser;
            await onSelected?.(uUser);
            setLoading(false);
        }
    }

    const onTriggerMultiSelected = async(uUsers) =>{
        setLoading(true);
        await onMultiSelected?.(uUsers);
        onChecked?.(uUsers?.length);
        setLoading(false);
    }

    const onMuliUserSelect = async(uUser) =>{
        document.getElementById("select-all").checked = false;
        if (muliUserIds.includes(uUser?.id)){
            muliUserIds = [];
            let tempMulti = [];
            for (let usr of multipleUsers){
                if (usr?.id !== uUser?.id){
                    tempMulti.push(usr);
                    muliUserIds.push(usr?.id);
                }
            }
            setMultipleUsers(tempMulti);
            onChecked?.(tempMulti.length);
        }else{
            muliUserIds.push(uUser?.id);
            setMultipleUsers([...multipleUsers, uUser]);
            onChecked?.([...multipleUsers, uUser].length);
        }
    }

    const onRefresh = async() =>{
        if (multipleUsers.length){
            await onTriggerMultiSelected(multipleUsers);
        }else{
            if (!singleUserSelectedRef.current?.id) return;
            await onTriggerSingleSelected(singleUserSelectedRef.current);
        }
    }

    const initCheckBoxId = (index) =>{
        const id = `checkbox-unique-id-${index}`;
        checkboxIds.push(id);
        return id;
    }

    const selectAllCheckbox = async(checked) =>{
        checkboxIds.forEach((id)=>{
            document.getElementById(id).checked = checked;
        });
        muliUserIds = [];
        if (checked){
            let temps = [];
            for (let usr of users){
                muliUserIds.push(usr?.id);
                temps.push(usr);
            };
            setMultipleUsers(temps);
            await onTriggerMultiSelected(temps);
        }else{
            setMultipleUsers([]);
            await onTriggerMultiSelected([]);
        }
    }

    const isSelected = (uUser) =>{
        if (multipleUsers?.length){
            singleUserSelectedRef.current = {};
            for (let mUser of multipleUsers){
                if (uUser?.id === mUser?.id) return true;
            }
        }else{
            if (uUser?.id === singleUserSelectedRef.current?.id) return true;
        }        
        return false;
    }

    const togglePage = () =>{
        if (tools.isMobile()){
            $(document.getElementById(CONTACT_ID)).slideToggle("slow");
        }
    }

    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }

    useEffect(()=>{
        initUsers();
    }, []);

    return(
        <div className="flex no-select">
            <div id={CONTACT_ID} className="log-user-container">
                <div style={{color:"var(--primary-color)"}}><b>Members</b></div>
                <SearchBar onTyping={onSearch} searchRef={searchRef} placeholder="Search users" />
                <div
                    onMouseEnter={()=>setShowOption(true)} 
                    onMouseLeave={()=>setShowOption(false)} 
                    className="log-user-scroller"
                >
                    <div hidden={!showOption} className={`float-top-left log-user-menu ${noMultiSelect && "hide"} ${!users?.length && "hide"}`}>
                        <div className="pad-mini flex">
                            <InputCheckbox onChange={selectAllCheckbox} id="select-all" />
                            <label>Select all</label>
                        </div>
                    </div>
                    {
                        users.length?
                        users.map((usr, key)=>(
                            <WidgetsInfo onClick={()=>onTriggerSingleSelected(usr)} cssClass="log-user" info={usr?.info?.role} style={{backgroundColor:isSelected(usr) && "gray"}} key={key}>
                                <div className="flex">
                                    <InputCheckbox onChange={()=>onMuliUserSelect(usr)} cssClass={noMultiSelect && "hide"} stopPropagation defaultChecked={isSelected(usr)} id={initCheckBoxId(key)} />
                                    <img src={usr?.info?.image || defaultImage} className="log-img" />
                                    <div className="relative">
                                        <div className="log-user-name">{usr?.info?.firstName} {usr?.info?.lastName}</div>
                                    </div>
                                </div>
                            </WidgetsInfo>
                        )):
                        <div>No users</div>
                    }
                </div>
            </div>

            <div className="max-width">
                <div className="max-width" style={{borderBottom:"1px solid gray"}}>
                    <div className="inline-block pad-mini hide-on-mobile">
                        <IconButton onClick={onRefresh} hidden={!useRefresh} label="Refresh" icon="refresh" cssClass="log-header-btn-text" iconCss="float-left log-header-btn-icon" />
                    </div>
                    {toolbar?.map((btn, key)=>(
                        <div className="inline-block pad-mini" key={key}>
                            <IconButton
                                onClick={()=>btn?.action?.()} 
                                label={btn?.title} 
                                disabled={btn?.disabled} 
                                icon={btn?.icon} 
                                style={{...btn?.style}}
                                border={btn?.border}
                                hidden={btn?.hidden}
                                cssClass={`log-header-btn-text ${btn?.css}`}
                                iconCss="float-left log-header-btn-icon" 
                            />
                        </div>
                    ))}
                    <EllipsisMenu options={menu} hidden={!menu?.length} />
                </div>
                <div className="relative" style={{height:"88vh"}}>{children}</div>
            </div>
            <LoadingBar isOpen={loading} />
            <div id={refreshId} onClick={onRefresh} />
        </div>
    )
}