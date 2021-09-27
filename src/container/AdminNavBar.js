import React from 'react';
import { NavigationBar } from './NavigationBar';
import { ADMIN_SIDE_NAV } from '../contents/lists';

export const AdminNavBar = ({useContact, isActive, options, children}) =>{

    return(
        <NavigationBar 
            menues={ADMIN_SIDE_NAV} 
            options={options} 
            useContact={useContact} 
            isActive={isActive}
        >
            {children}
        </NavigationBar>
    )
}