import React from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { UserEntryInputs } from '../settings/UserEntryInputs';
import { FaUsers } from 'react-icons/fa';


export const AddUser = () =>{
    return (
        <AdminNavBar>
            <div className="pad add-update-new-user-info add-member-container-on-mobile">
                <div className="header" style={{borderBottom:"1px solid var(--border)",marginBottom:"30px"}}>
                    <FaUsers className="add-member-icon" />
                    <b>New Member</b>
                </div>         
            </div>

            <UserEntryInputs
                profileFName="Select"
                profileLName="user image"
                profileMsg="Optional"
                profileStyle={{}}
            />
        </AdminNavBar>
    )
}