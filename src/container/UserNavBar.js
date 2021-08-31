import React, { useEffect, useState } from 'react';
import { USER_SIDE_NAV } from '../contents/lists';
import { NavigationBar } from './NavigationBar';

export const UserNavBar = ({datePicker, onDatePicker, options, children}) =>{
    return(
        <NavigationBar
            options={options}
            datePicker={datePicker} 
            onDatePicker={onDatePicker} 
            menues={USER_SIDE_NAV}
        >
            {children}
        </NavigationBar>
    )
}