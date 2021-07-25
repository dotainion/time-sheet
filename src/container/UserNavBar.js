import React from 'react';
import { userNavs } from '../contents/lists';
import { NavigationBar } from './NavigationBar';

export const UserNavBar = ({onDatePicker, children}) =>{
    return(
        <NavigationBar router onDatePicker={onDatePicker} menues={userNavs}>
            {children}
        </NavigationBar>
    )
}