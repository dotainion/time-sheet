import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../auth/Authentication';
import { EventCalendar } from '../../calendarEvent/EventCalendar';
import { Modal } from '../../container/Modal';
import { UserNavBar } from '../../container/UserNavBar';
import { getSchedule } from '../../database/schedules/SchedulesDb';
import { TimeCart } from '../../widgets/TimeCard';


export const TimeSheet = () =>{
    const { user } = useAuth();

    const [showView, setShowView] = useState(false);
    const [showOption, setShowOption] = useState();
    const [schedules, setSchedules] = useState([]);

    const options = [{title:"Calendar view"},{title:"List view"}];

    const initSchedule = async() =>{
        const result = await getSchedule(user?.id);
        setSchedules(result?.schedules);
    }

    const toggleMenuOption = (state) =>{
        setShowOption(state);
    }

    const toggleView = (e) =>{
        const cmd = e.target.value;
        if (cmd === options[0].title) setShowView(false);
        if(cmd === options[1].title) setShowView(true);
    }

    useEffect(()=>{
        initSchedule();
    }, []);
    return(
        <UserNavBar onOptionClick={toggleMenuOption}  onOptionChange={toggleView} options={showOption && options}>
            <Modal isOpen={!showView}>
                <EventCalendar readOnly tasksAsign={schedules}/>
            </Modal>
            <TimeCart isOpen={showView} timeOptions={schedules} useSchedule />
        </UserNavBar>
    )
}