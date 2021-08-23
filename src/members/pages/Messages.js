import React from 'react';
import { UserNavBar } from '../../container/UserNavBar';
import { Messages } from '../../apps/other/Messages';


export const UserMessages = () =>{
    return(
        <UserNavBar>
            <Messages/>
        </UserNavBar>
    )
}