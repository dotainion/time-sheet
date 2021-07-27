import React, { useEffect, useState } from 'react';
import { calendarUtils } from './Utils';
import { tools } from '../tools/Tools';
import { week } from '../contents/lists';
import { AsignSchedule } from './AsignSchedule';
import { EventSideMenu } from './EventSideMenu';


const checkboxIds = [];
export const EventCalendar = ({members, memberSelected}) => {
    const [calendarDate, setCalendarDate] = useState([]);
    const [showAsignTask, setShowAsignTask] = useState(false);
    const [selectMulti, setSelectMilti] = useState(false);
    const [showAsignTaskMulti, setShowAsignTaskMulti] = useState(false);

    const onShowMultiCheckBox = () =>{
        setShowAsignTask(false);
        setSelectMilti(!selectMulti);
    }

    const configIds = (id) =>{
        checkboxIds.push(id);
        return id;
    }

    const selectAll = (id) =>{
        for (let chckBx of checkboxIds){
            
        }
    }

    useEffect(()=>{
        const utils = calendarUtils.init();
        setCalendarDate(utils.get());
    }, []);
    return(
        <div className="float-center calender-event">
            <div className="flex">
                <div hidden={!selectMulti} className="float-center">
                    <div className="calender-event-floating-btn">
                        <button className="btn">Select All</button>
                        <button onClick={()=>setShowAsignTaskMulti(true)} className="btn">Asign to {`
                            ${memberSelected?.info?.firstName}
                            ${memberSelected?.info?.lastName}
                        `}</button>
                    </div>
                </div>
                <div>
                    <EventSideMenu
                        selectMultiple={{action:onShowMultiCheckBox,state:selectMulti}}
                    />
                </div>
                <div className="max-width">
                    <div className="calender-event-week">
                        {week?.map((month, key)=>(
                            <div className="calender-event-week-header" key={key}>
                                <div className="">{month}</div>
                            </div>
                        ))}
                    </div>
                    <div className="relative" style={{backgroundColor:"var(--bg-fade-horizontal)"}}>
                        {calendarDate.map((weekDate, key)=>(
                            <div className="calender-event-week" key={key}>
                                {weekDate?.map((date, key)=>(
                                    <div onClick={()=>setShowAsignTask(true)} className={`calender-event-date-container ${!date?.is && "not-in-month"}`} key={key}>
                                        <div hidden={!selectMulti} onClick={e=>e.stopPropagation()} className="float-center max-size" style={{zIndex:"9999999"}}>
                                            <input className="float-top-right" id={configIds(`event-checkbox-id-${key}`)} type="checkbox"/>
                                        </div>
                                        <div className="calendar-number">{tools.time.day(date?.value)}</div>
                                        <div className="calendar-contents">hellow orld</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <AsignSchedule
                            //add to multiple date to a user
                            isOpen={showAsignTaskMulti} 
                            zIndex={"99999999999999"}
                            onClose={()=>setShowAsignTaskMulti(false)}
                            memberSelected={memberSelected} 
                        />
                        <AsignSchedule
                            //add single date to a user
                            isOpen={showAsignTask} 
                            onClose={()=>setShowAsignTask(false)}
                            memberSelected={memberSelected} 
                            members={members} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}