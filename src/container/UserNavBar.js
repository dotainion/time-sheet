import React from 'react';
import { userNavs } from '../contents/lists';
import { NavigationBar } from './NavigationBar';

export const UserNavBar = ({datePicker, onDatePicker, children}) =>{
    return(
        <NavigationBar router datePicker={datePicker} onDatePicker={onDatePicker} menues={userNavs}>
            {children}
        </NavigationBar>
    )
}