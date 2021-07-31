import React from 'react';
import { FcCalendar } from 'react-icons/fc';

export const SideInfo = () =>{
    return(
        <div className="creds-side-info hide-on-mobile">
            <div className="flex float-top-center max-width">
                <div className="max-width">
                    <FcCalendar style={{fontSize:"300px"}} />
                </div>
                <div className="max-width">
                    <p className="sub-header-normal">Track attendance, breaks, and time off with ease.</p>
                    <p className="sub-header-normal">Reliable time tracking. Hassle-free attendance management.</p>
                    <p className="sub-header-normal">Easy attendance management that gives you full control with real-time visibility.</p>
                    <p className="sub-header-normal">Communicate, schedule, and track attendance all in one place.</p>
                </div>
            </div>
        </div>
    )
}