import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Calendar } from '../../apps/calendar/Calendar';
import { MdDateRange } from 'react-icons/md';
import { tools } from '../../utils/tools/Tools';
import { useStore } from '../../state/stateManagement/stateManagement';
import { HiDotsVertical } from 'react-icons/hi';
import { ShowErrors } from '../../state/errors/ShowErrors';
import { Header } from '../../layouts/Header';

export const Toolbar = ({onMenuClick, on3DotClick}) =>{

    return(
        <>
            <div className="toolbar">
                <GiHamburgerMenu onClick={onMenuClick} className="HamburgerMenu float-left" />
                <div><Header/></div>
                <HiDotsVertical onClick={on3DotClick} className="float-right" style={{fontSize:"20px",right:"15px",display:!on3DotClick && "none"}} />
                <ShowErrors/>
            </div>
        </>
    )
}