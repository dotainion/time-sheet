import React from 'react';
import { useHistory } from 'react-router';
import { adminRoutes } from '../../utils/routes/Routes';
import { UsersListContainer } from '../admin/other/UsersListContainer';


export const AdminSettignsContainer = ({showCurrentUser, onSelected, noMultiSelect, hideContacts, settings, myProfile, updateUserProfile, updateUserEmail, updateEmail, advanceReset, children}) =>{
    const history = useHistory();

    return(
        <UsersListContainer 
            onSelected={onSelected}
            hideContacts={hideContacts}
            noMultiSelect={noMultiSelect}
            showCurrentUser={showCurrentUser}
            toolbar={[
                {title: "Setttings", hidden: settings, action: ()=>history.push(adminRoutes.settings)},
                {title: "Update Profile", hidden: updateUserProfile, action: ()=>history.push(adminRoutes.usersProfile)},
                {title: "Update Email", hidden: updateUserEmail, action: ()=>history.push(adminRoutes.updateUserEmail)},
                {title: "Password", hidden: advanceReset, action: ()=>history.push(adminRoutes.advanceReset)},
            ]}
        >
            <div style={{paddingTop:"10px",height:"85vh"}}>{children}</div>
        </UsersListContainer>
    )
}