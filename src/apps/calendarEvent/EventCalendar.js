import React, { useEffect, useState } from 'react';
import { calendarUtils } from './Utils';
import { tools } from '../../utils/tools/Tools';
import { WEEK } from '../../contents/lists';
import { AsignSchedule } from './AsignSchedule';
import { EventSideMenu } from './EventSideMenu';
import { ButtonOption } from '../../components/widgets/ButtonOption';
import { BiDotsVertical } from 'react-icons/bi';
import { addSchedule } from '../../database/schedules/SchedulesDb';
import { useStore } from '../../state/stateManagement/stateManagement';

/**
 * @param members is a list of all members 
 * @param usersSelected is a list of selected memebers
 */
let holdScheduleDate = [];
let holdTempDateForComment = {};

const utils = calendarUtils.init(new Date().getMonth(), new Date().getFullYear());
const monthDates = utils.get();
export const EventCalendar = ({readOnly, tasksAsign, usersSelected}) => {
    const { settings } = useStore();

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
        parseSchedule({date,comment:null, duration:settings?.durationDefault});
    }

    const onPushEdit = (obj) =>{
        holdScheduleDate[obj?.index] = {date:obj?.date, comment:obj?.comment, duration:obj?.duration};
    }

    const onPushComments = (obj) =>{ 
        if (!holdTempDateForComment?.id || !holdTempDateForComment?.date) return;
        const {date, id} = holdTempDateForComment;
        heilight(id);
        parseSchedule({date, comment:obj?.comment, duration:obj?.duration});
    }

    const onAddComment = (id, date) =>{
        holdTempDateForComment = {date,id};
        setShowAsignTask(true);
    }

    const showBtnOptions = (state, id, date) =>{
        try{
            if (readOnly) return;
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

    //check if date included in asign dates
    const isTaskAsign = (date) =>{
        for (let time of tasksAsign || []){
            if (tools.time.date(time?.date) === tools.time.date(date)){
                return {comment: time?.comment, asign:true};
            }
        }
        return null;
    }

    const configScheduleTimeStamp = () =>{
        let objTimeStamp = [];
        for (let obj of holdScheduleDate){
            obj["date"] = tools.time.digits(obj?.date);
            objTimeStamp.push(obj);
        }
        holdScheduleDate = objTimeStamp;
        return objTimeStamp;
    }

    //will iterate through each users and check if any user was mark as unasign to prevent asignment
    //for now user is not being unasign
    //Note: unasignment should be handled in EventSideMenu.js
    const onAsignSchedule = async(users) =>{
        if (!users?.length) return alert("No members selected");
        if (!holdScheduleDate.length) return alert("No schedule selected");
        configScheduleTimeStamp();
        for (let user of users){
            await addSchedule({schedules: holdScheduleDate},user?.id);
        }
        alert("Tasks asigned");
    }

    useEffect(()=>{
        let data = [];
        if (readOnly){
            for (let dateObj of monthDates){
                let tempArray = [];
                for (let time of dateObj){
                    const asignment = isTaskAsign(time?.value);
                    if (asignment?.asign) tempArray.push({...time, comment: asignment?.comment, isAsign: true});
                    else tempArray.push(time);
                }
                data.push(tempArray);
            }
        }else data = monthDates;
        setCalendarDate(data);
    }, [tasksAsign]);
    return(
        <div className="float-center calendar-event">
            <div className="flex">
                <div className="float-top-right hide-on-desktop" style={{top:"-60px"}}>
                    <BiDotsVertical onClick={toggleEventMenu} style={{fontSize:"30px"}}/>
                </div>
                <div hidden={readOnly} className={`mobile-overlay ${closeEventSideMenuOnMobile}`}>
                    <div className="backdrop hide-on-desktop" style={{width:window.screen.width,zIndex:"-1"}} />
                    <EventSideMenu
                        usersSelected={usersSelected}
                        onClose={toggleEventMenu}
                        onAsign={onAsignSchedule}
                    />
                </div>
                <div className="max-width calendar-event-on-mobile">
                    <div className="calendar-event-week">
                        {WEEK?.map((month, key)=>(
                            <div className="calendar-event-week-header" key={key}>
                                <div className="">{month}</div>
                            </div>
                        ))}
                    </div>
                    <div className="relative" style={{background:"var(--bg-fade-horizontal)"}}>
                        {calendarDate?.map?.((weekDate, key)=>(
                            <div className="calendar-event-week" key={key}>
                                {weekDate?.map?.((date, key)=>(
                                    <div 
                                        //onClick, onMouseEnter and onMouseLeave will show <ButtonOption>
                                        //if date value is stared that will determine which <buttonOption? will be display on hover
                                        onClick={()=>showBtnOptions(false, `${tools.time.digits(date?.value)}-cal-btn-option`, date?.value)} 
                                        onMouseEnter={()=>showBtnOptions(false, `${tools.time.digits(date?.value)}-cal-btn-option`, date?.value)} 
                                        onMouseLeave={()=>showBtnOptions(true, `${tools.time.digits(date?.value)}-cal-btn-option`, date?.value)} 
                                        className={`calendar-event-date-container ${!date?.is && "not-in-month"}`} 
                                        key={key}>
                                        <div id={`${tools.time.digits(date?.value)}-cal-num`} className={`calendar-number relative ${readOnly && date?.isAsign?"isAsign":null}`}>{tools.time.day(date?.value)}</div>
                                        <div  hidden={!readOnly} className={`calendar-contents ${readOnly && date?.isAsign && date?.comment?null:"hide"}`}>{date?.comment}</div>
                                        <div hidden={readOnly} className="float-center">Tasks</div>
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
                                setInitValuetoBeEdited(null);
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