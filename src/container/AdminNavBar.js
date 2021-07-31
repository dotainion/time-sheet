import React from 'react';
import { NavigationBar } from './NavigationBar';
import { ADMIN_SIDE_NAV } from '../contents/lists';

export const AdminNavBar = ({datePicker, onDatePicker, options, onOptionChange, children}) =>{

    return(
        <NavigationBar
            options={options}
            onOptionChange={onOptionChange}
            datePicker={datePicker}
            onDatePicker={onDatePicker} 
            menues={ADMIN_SIDE_NAV}
        >
            {children}
        </NavigationBar>
    )
}