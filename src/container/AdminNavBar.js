import React from 'react';
import { NavigationBar } from './NavigationBar';
import { ADMIN_SIDE_NAV } from '../contents/lists';

export const AdminNavBar = ({isActive, children}) =>{

    return(
        <NavigationBar menues={ADMIN_SIDE_NAV} isActive={isActive}>
            {children}
        </NavigationBar>
    )
}