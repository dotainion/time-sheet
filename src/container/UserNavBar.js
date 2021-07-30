import React, { useEffect, useState } from 'react';
import { USER_SIDE_NAV } from '../contents/lists';
import { NavigationBar } from './NavigationBar';

let TOGGLE_STATE = false;
export const UserNavBar = ({datePicker, onDatePicker, options, onOptionClick, onOptionChange, children}) =>{
    const toggleOpton = () =>{
        TOGGLE_STATE = !TOGGLE_STATE
        onOptionClick?.(TOGGLE_STATE);
    }
    return(
        <NavigationBar 
            //for the 3 dot menu on the tool bar
            onOptionClick={toggleOpton} 
            options={options}
            onOptionChange={onOptionChange}
            datePicker={datePicker} 
            onDatePicker={onDatePicker} 
            menues={USER_SIDE_NAV}
        >
            {children}
        </NavigationBar>
    )
}