import React, { useRef, useEffect, useState } from 'react';
import { NoRecord } from '../../../components/widgets/NoRecord';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { AdminSettignsContainer } from '../../widgets/AdminSettingsContainer';
import { AdminInputEntry } from '../other/AdminInputEntry';
import $ from 'jquery';
import { IconButton } from '../../../components/widgets/IconButon';
import { useAuth } from '../../../state/auth/Authentication';


export const UpdateProfiles = () =>{
    const { user, initUser } = useAuth();

    const [userSelected, setUserSelected] = useState({});
    const [updateToggle, setUpdateToggle] = useState(false);

    const entryRef = useRef();

    useEffect(()=>{
        if (updateToggle){
            setUserSelected({info: user, id: user?.id});
        }else{
            setUserSelected(null);
        }
    }, [updateToggle]);

    useEffect(()=>{
        if (Object.keys(userSelected || {}).length){
            $(entryRef.current).show("slow");
        }else{
            $(entryRef.current).hide("slow");
        }
    }, [userSelected]);
    return(
        <AdminNavBar isActive>
            <AdminSettignsContainer showCurrentUser={updateToggle} updateUserProfile noMultiSelect onSelected={setUserSelected}>
                <div className="pad">
                    <IconButton onClick={()=>setUpdateToggle(!updateToggle)} label="My Email" icon="email" />
                </div>
                <div ref={entryRef} className="max-width hide">
                    <AdminInputEntry
                        useUpdate
                        userSelected={userSelected}
                        onUpdateComplete={()=>{
                            setUserSelected({});
                            if (updateToggle) initUser();
                        }}
                    />:                        
                </div>
                <div hidden={Object.keys(userSelected || {}).length} className="max-width">
                    <NoRecord
                        icon="users"
                        header="Edit User's profile"
                        message="From the list to the left, select profile you will like to edit."
                    />
                </div>
            </AdminSettignsContainer>
        </AdminNavBar>
    )
}