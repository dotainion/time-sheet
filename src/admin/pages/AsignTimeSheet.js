import React from 'react';
import { EventCalendar } from '../../calendarEvent/EventCalendar';
import { Modal } from '../../container/Modal';


export const AsignTimeSheet = ({isOpen, members, usersSelected, onClose}) =>{
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <EventCalendar
                usersSelected={usersSelected} 
                members={members} 
            />
        </Modal>
    )
}