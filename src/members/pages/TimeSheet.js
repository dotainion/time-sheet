import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../state/auth/Authentication';
import { EventCalendar } from '../../apps/calendarEvent/EventCalendar';
import { Modal } from '../../container/Modal';
import { UserNavBar } from '../../container/UserNavBar';
import { getSchedule } from '../../database/schedules/SchedulesDb';
import { TimeCard } from '../../components/widgets/TimeCard';


export const TimeSheet = () =>{
    const { user } = useAuth();

    const [showView, setShowView] = useState(false);
    const [schedules, setSchedules] = useState([]);

    const options = [[
        {title:"Calendar view", command: ()=>setShowView(false)},
        {title:"List view", command: ()=>setShowView(true)}
    ]];

    const initSchedule = async() =>{
        const result = await getSchedule(user?.id);
        setSchedules(result?.schedules);
    }

    useEffect(()=>{
        initSchedule();
    }, []);
    return(
        <UserNavBar options={options}>
            <Modal isOpen={!showView}>
                <EventCalendar readOnly tasksAsign={schedules} />
            </Modal>
            <TimeCard isOpen={showView} timeOptions={schedules} useSchedule />
        </UserNavBar>
    )
}
