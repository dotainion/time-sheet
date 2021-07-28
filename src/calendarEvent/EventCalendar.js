import React, { useEffect, useState } from 'react';
import { calendarUtils } from './Utils';
import { tools } from '../tools/Tools';
import { week } from '../contents/lists';
import { AsignSchedule } from './AsignSchedule';
import { EventSideMenu } from './EventSideMenu';
import { ButtonOption } from '../widgets/ButtonOption';
import { BiDotsVertical } from 'react-icons/bi';

/**
 * @param members is a list of all members 
 * @param usersSelected is a list of selected memebers
 */
let holdScheduleDate = [];
let holdTempDateForComment = {};
export const EventCalendar = ({members, usersSelected}) => {
    const [calendarDate, setCalendarDate] = useState([]);
    const [showAsignTask, setShowAsignTask] = useState(false);
    const [initValuetoBeEdited, setInitValuetoBeEdited] = useState(null);
    const [closeEventSideMenuOnMobile, setCloseEventSideMenuOnMobile] = useState("");

    const toggleEventMenu = () =>{
        if (!closeEventSideMenuOnMobile) setCloseEventSideMenuOnMobile("hide-on-mobile");
        else setCloseEventSideMenuOnMobile("");
    }
    const heilight = (id, attr=true) =>{
        try{
            const element = document.getElementById(id);
            element.style.width = attr? "20px": "";
            element.style.height = attr? "20px": "";
            element.style.padding = attr? "1px": "";
            element.style.textAlign = attr? "center": "";
            element.style.borderRadius = attr? "50%": "";
            element.style.backgroundColor = attr? "blue": "";
            element.style.boxShadow = attr? "2px 2px 5px black": "";
        }catch(error){
            console.log(error);
        }
    }

    const deleteDate = (id, date) =>{
        let tempHolder = [];
        for (let time of holdScheduleDate){
            if (tools.time.date(time?.date) !== tools.time.date(date)){
                tempHolder.push(time);
            }else{
                heilight(id, false);
            }
        }
        holdScheduleDate = tempHolder;
    }

    const getDateObjWithIndex = (date) =>{
        let index = 0;
        for (let time of holdScheduleDate){
            if (tools.time.date(time?.date) === tools.time.date(date)){
                return {time,index};
            }
            index ++;
        }
        return null;
    }

    const editDate = (date) =>{
        const obj = getDateObjWithIndex(date);
        setInitValuetoBeEdited(obj);
        setShowAsignTask(true);
    }

    const isDateInclude = (obj) =>{
        for (let time of holdScheduleDate){
            if (tools.time.date(time?.date) === tools.time.date(obj?.date)){
                return true;
            }
        }
        return false;
    }

    const parseSchedule = (obj) =>{
        if (!isDateInclude(obj)){
            holdScheduleDate.push(obj);
        }
    }

    const onAddDate = (id, date) =>{;
        heilight(id);
        parseSchedule({date,comment:null});
    }

    const onPushEdit = (obj) =>{
        holdScheduleDate[obj?.index] = {date:obj?.date, comment:obj?.comment};
    }

    const onPushComments = (comment) =>{
        if (!holdTempDateForComment?.id || !holdTempDateForComment?.date) return;
        const {date, id} = holdTempDateForComment;
        heilight(id);
        parseSchedule({date, comment});
        setInitValuetoBeEdited(null);
    }

    const onAddComment = (id, date) =>{
        holdTempDateForComment = {date,id};
        setShowAsignTask(true);
    }

    const showBtnOptions = (state, id, date) =>{
        try{
            if (!isDateInclude({date})){
                document.getElementById(`${id}-add`).hidden = state;
                document.getElementById(`${id}-edit`).hidden = true;
            }else{
                document.getElementById(`${id}-edit`).hidden = state;
                document.getElementById(`${id}-add`).hidden = true;
            }
        }catch(error){
            console.log(error);
        }
    }

    //will iterate through each users and check if any user was mark as unasign to prevent asignment
    const onAsignSchedule = (users) =>{

    }

    useEffect(()=>{
        const utils = calendarUtils.init();
        setCalendarDate(utils.get());
    }, []);
    return(
        <div className="float-center calendar-event">
            <div className="flex">
                <div className="float-top-right" style={{top:"-60px"}}>
                    <BiDotsVertical onClick={toggleEventMenu} style={{fontSize:"30px"}}/>
                </div>
                <div className={`mobile-overlay ${closeEventSideMenuOnMobile}`}>
                    <div className="backdrop hide-on-desktop" style={{width:window.screen.width,zIndex:"-1"}} />
                    <EventSideMenu
                        usersSelected={usersSelected}
                        onClose={toggleEventMenu}
                        onAsign={onAsignSchedule}
                    />
                </div>
                <div className="max-width calendar-event-on-mobile">
                    <div className="calendar-event-week">
                        {week?.map((month, key)=>(
                            <div className="calendar-event-week-header" key={key}>
                                <div className="">{month}</div>
                            </div>
                        ))}
                    </div>
                    <div className="relative" style={{background:"var(--bg-fade-horizontal)"}}>
                        {calendarDate.map((weekDate, key)=>(
                            <div className="calendar-event-week" key={key}>
                                {weekDate?.map((date, key)=>(
                                    <div 
                                        //onClick, onMouseEnter and onMouseLeave will show <ButtonOption>
                                        //if date value is stared that will determine which <buttonOption? will be display on hover
                                        onClick={()=>showBtnOptions(false, `${tools.time.digits(date?.value)}-cal-btn-option`, date?.value)} 
                                        onMouseEnter={()=>showBtnOptions(false, `${tools.time.digits(date?.value)}-cal-btn-option`, date?.value)} 
                                        onMouseLeave={()=>showBtnOptions(true, `${tools.time.digits(date?.value)}-cal-btn-option`, date?.value)} 
                                        className={`calendar-event-date-container ${!date?.is && "not-in-month"}`} 
                                        key={key}>
                                        <div id={`${tools.time.digits(date?.value)}-cal-num`} className="calendar-number relative">{tools.time.day(date?.value)}</div>
                                        <div hidden className="calendar-contents">hellow orld</div>
                                        <ButtonOption
                                            options={[
                                                {
                                                    title: !isDateInclude(date?.value) && "Add",
                                                    command: ()=>onAddDate(`${tools.time.digits(date?.value)}-cal-num`, date?.value)
                                                },{
                                                    title: "comment",
                                                    command: ()=>onAddComment(`${tools.time.digits(date?.value)}-cal-num`, date?.value)
                                                }
                                            ]}
                                            id={`${tools.time.digits(date?.value)}-cal-btn-option-add`}
                                            cssClass="float-center"
                                            hidden
                                        />
                                        <ButtonOption
                                            options={[
                                                {
                                                    title: "Edit",
                                                    command: ()=>editDate(date?.value)
                                                },{
                                                    title: "Delete",
                                                    command: ()=>deleteDate(`${tools.time.digits(date?.value)}-cal-num`, date?.value)
                                                }
                                            ]}
                                            id={`${tools.time.digits(date?.value)}-cal-btn-option-edit`}
                                            cssClass="float-center"
                                            hidden
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                        <AsignSchedule
                            isOpen={showAsignTask} 
                            onClose={()=>{
                                setShowAsignTask(false);
                                holdTempDateForComment = {};
                            }}
                            onAdd={onPushComments}
                            onEdit={onPushEdit}
                            valueObj={initValuetoBeEdited}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}