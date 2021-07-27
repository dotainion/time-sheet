import React from 'react';
import { NavigationBar } from './NavigationBar';
import { adminNavs } from '../contents/lists';

export const AdminNavBar = ({onClick, datePicker, onDatePicker, children}) =>{

    return(
        <NavigationBar
            returnValue 
            onClick={onClick} 
            datePicker={datePicker}
            onDatePicker={onDatePicker} 
            menues={adminNavs}
        >
            {children}
        </NavigationBar>
    )
}