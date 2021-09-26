import React, { useRef }  from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { AdminInputEntry } from '../other/AdminInputEntry';
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

            <AdminInputEntry
                profileFName="Select"
                profileLName="user image"
                profileStyle={{}}
            />
        </AdminNavBar>
    )
}