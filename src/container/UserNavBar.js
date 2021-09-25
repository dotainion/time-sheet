import React from 'react';
import { USER_SIDE_NAV } from '../contents/lists';
import { NavigationBar } from './NavigationBar';

export const UserNavBar = ({children}) =>{
    return(
        <NavigationBar menues={USER_SIDE_NAV}>
            {children}
        </NavigationBar>
    )
}