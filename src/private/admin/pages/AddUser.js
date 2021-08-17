import React from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { UserEntryInputs } from '../settings/UserEntryInputs';


export const AddUser = () =>{
    return (
        <AdminNavBar>
            <ContentsWrapper isOpen={true} noScroll>
                <div
                    style={{
                        fontSize:"25px",
                        borderBottom:"1px solid white",
                        marginBottom:"30px"
                    }}
                ><b>New Member</b></div>
                <UserEntryInputs/>         
            </ContentsWrapper>
        </AdminNavBar>
    )
}