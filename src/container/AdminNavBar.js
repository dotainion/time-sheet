import React from 'react';
import { NavigationBar } from './NavigationBar';
import { adminNavs } from '../contents/lists';

export const AdminNavBar = ({onClick, children}) =>{

    return(
        <NavigationBar returnValue onClick={onClick} menues={adminNavs}>
            {children}
        </NavigationBar>
    )
}