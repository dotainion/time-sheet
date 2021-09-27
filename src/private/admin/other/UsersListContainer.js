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


let muliUserIds = [];
let checkboxIds = [];
export const UsersListContainer = ({toolbar, subToolbar, menu, onSelected, onMultiSelected, refreshId, children}) =>{
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [showOption, setShowOption] = useState(false);
    const [multipleUsers, setMultipleUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const singleUserSelectedRef = useRef();

    const onTriggerSingleSelected = async(uUser) =>{
        if (!multipleUsers.length){
            setLoading(true);
            singleUserSelectedRef.current = uUser;
            await onSelected?.(uUser);
            setLoading(false);
        }
    }

    const onTriggerMultiSelected = async(uUsers) =>{
        setLoading(true);
        await onMultiSelected?.(uUsers);
        setLoading(false);
    }

    const onMuliUserSelect = (uUser) =>{
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
        }else{
            muliUserIds.push(uUser?.id);
            setMultipleUsers([...multipleUsers, uUser]);
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
        }else setMultipleUsers([]);
    }

    const initUsers = async() =>{
        setUsers(await getUsers(user?.accessId, user?.id));
    }

    useEffect(()=>{
        initUsers();
    }, []);

    return(
        <div className="flex no-select">
            <div className="log-user-container">
                <SearchBar placeholder="Search users" />
                <div
                    onMouseEnter={()=>setShowOption(true)} 
                    onMouseLeave={()=>setShowOption(false)} 
                    className="log-user-scroller"
                >
                    <div hidden={!showOption} className="float-top-left log-user-menu">
                        <div className="pad-mini flex">
                            <InputCheckbox onChange={selectAllCheckbox} id="select-all" />
                            <label>Select all</label>
                        </div>
                    </div>
                    {
                        users.length?
                        users.map((usr, key)=>(
                            <WidgetsInfo onClick={()=>onTriggerSingleSelected(usr)} cssClass="log-user" info="some msg" key={key}>
                                <div className="flex">
                                    <InputCheckbox onChange={()=>onMuliUserSelect(usr)} stopPropagation id={initCheckBoxId(key)} />
                                    <img src={usr?.info?.image || defaultImage} className="log-img" />
                                    <div>{usr?.info?.firstName} {usr?.info?.lastName}</div>
                                </div>
                            </WidgetsInfo>
                        )):
                        <div>No users</div>
                    }
                </div>
            </div>

            <div className="max-width">
                <div className="max-width" style={{borderBottom:"1px solid gray"}}>
                    <div className="inline-block pad-mini">
                        <IconButton onClick={onRefresh} label="Refresh" icon="refresh" cssClass="log-header-btn-text" iconCss="float-left log-header-btn-icon" />
                    </div>
                    {toolbar?.map((btn, key)=>(
                        <div className="inline-block pad-mini" key={key}>
                            <IconButton
                                onClick={()=>btn?.action?.()} 
                                label={btn?.title} 
                                disabled={btn?.disabled} 
                                icon={btn?.icon} 
                                cssClass="log-header-btn-text" 
                                iconCss="float-left log-header-btn-icon" 
                            />
                        </div>
                    ))}
                    <div className="inline-block pad-mini">
                        <div style={{color:"red"}}><b>{"Editing is on..."}</b></div>
                    </div>
                    <EllipsisMenu options={menu} hidden={!menu?.length} />
                </div>
                <div>{subToolbar}</div>
                <div>{children}</div>
            </div>
            <LoadingBar isOpen={loading} />
            <div id={refreshId} onClick={onRefresh} />
        </div>
    )
}