import React from 'react';
import { EventCalendar } from '../../calendarEvent/EventCalendar';
import { Modal } from '../../container/Modal';


export const AsignTimeSheet = ({isOpen, members, memberSelected, onClose}) =>{
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <EventCalendar isOpen memberSelected={memberSelected} members={members} />
        </Modal>
    )
}