import React from 'react';
import { BreadCrumbs } from './BreadCrumbs';


export const AdminSettignsContainer = ({settings, myProfile, updateUserEmail, updateEmail, advanceReset, children}) =>{
    return(
        <div>
            <BreadCrumbs 
                settings={settings} 
                myProfile={myProfile} 
                updateUserEmail={updateUserEmail} 
                updateEmail={updateEmail} 
                advanceReset={advanceReset} 
            />
            <div style={{paddingTop:"10px",height:"85vh"}}>{children}</div>
        </div>
    )
}