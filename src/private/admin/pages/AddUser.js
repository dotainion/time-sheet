import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../state/auth/Authentication';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { ROLES } from '../../../contents/lists';
import { useError } from '../../../state/errors/Error';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { AddOrUpdateNewUser } from '../settings/AddOrUpdateNewUser';


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
                <AddOrUpdateNewUser/>         
            </ContentsWrapper>
        </AdminNavBar>
    )
}