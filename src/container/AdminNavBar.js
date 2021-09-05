import React from 'react';
import { NavigationBar } from './NavigationBar';
import { ADMIN_SIDE_NAV } from '../contents/lists';

export const AdminNavBar = ({options, children}) =>{

    return(
        <NavigationBar
            options={options}
            menues={ADMIN_SIDE_NAV}
        >
            {children}
        </NavigationBar>
    )
}