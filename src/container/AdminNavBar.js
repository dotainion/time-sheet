import React from 'react';
import { NavigationBar } from './NavigationBar';
import { ADMIN_SIDE_NAV } from '../contents/lists';

export const AdminNavBar = ({datePicker, onDatePicker, options, children}) =>{

    return(
        <NavigationBar
            options={options}
            datePicker={datePicker}
            onDatePicker={onDatePicker} 
            menues={ADMIN_SIDE_NAV}
        >
            {children}
        </NavigationBar>
    )
}