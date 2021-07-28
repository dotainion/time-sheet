import React from 'react';
import { EventCalendar } from '../calendarEvent/EventCalendar';
import { ContentsWrapper } from '../container/ContentsWrapper';
import { Modal } from '../container/Modal';
import { UserNavBar } from '../container/UserNavBar';
import { tools } from '../tools/Tools';


export const TimeSheet = () =>{
console.log(tools.time.digits())
    return(
        <UserNavBar>
            <Modal isOpen>
                <EventCalendar readOnly tasksAsign={[{info:{date:1627457014174,comment:"hello world"}}]}/>
            </Modal>
        </UserNavBar>
    )
}