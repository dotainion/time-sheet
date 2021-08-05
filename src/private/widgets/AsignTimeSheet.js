import React from 'react';
import { EventCalendar } from '../../apps/calendarEvent/EventCalendar';
import { Modal } from '../../container/Modal';
import { SpanWrapper } from '../../container/SpanWrapper';


export const AsignTimeSheet = ({isOpen, usersSelected, onClose}) =>{
    
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <EventCalendar
                onAsignStop={onClose}
                usersSelected={usersSelected} 
            />
        </Modal>
    )
}