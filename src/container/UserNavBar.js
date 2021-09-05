import React, { useEffect, useState } from 'react';
import { USER_SIDE_NAV } from '../contents/lists';
import { NavigationBar } from './NavigationBar';

export const UserNavBar = ({options, children}) =>{
    return(
        <NavigationBar
            options={options}
            menues={USER_SIDE_NAV}
        >
            {children}
        </NavigationBar>
    )
}