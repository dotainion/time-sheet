import React, { useRef, useEffect, useState } from 'react';
import defaultImage from '../../../images/default-image.jpg';
import defaultImage2 from '../../../images/default-image-blue.png';
import { Entry } from '../../../components/widgets/Entry';
import { RadioButton } from '../../../components/widgets/RadioButton';
import { SearchBar } from '../../../components/widgets/SearchBar';
import { SelectOptions } from '../../../components/widgets/SelectOption';
import { TimePicker } from '../../../components/widgets/TimePicker';
import { Profile } from '../../../components/other/Profile';
import { MdDateRange } from 'react-icons/md';
import { WiTime2, WiTime8 } from 'react-icons/wi';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { DaysPicker } from '../../../apps/calendar/Calendar';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { REPEAT, WEEK_ABRIV } from '../../../contents/lists';
import { Button } from '../../../components/widgets/Buttons';
import { DateEntry } from '../../../components/widgets/DateEntry';
import { getUsers } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { WidgetsInfo } from '../../../components/widgets/WidgetsInfo';
import { addSchedule, getSchedule } from '../../../database/schedules/SchedulesDb';
import { tools } from '../../../utils/tools/Tools';
import { WiDaySunny } from 'react-icons/wi';
import { Alert } from '../../../components/other/Alert';
import { AddTimeToCalendarDays } from '../../../components/other/AddTimeToCalendarDays';
import { BsQuestionCircle } from 'react-icons/bs';
import { LoadingBar } from '../../../components/widgets/LoadingBar';
import { useHistory } from 'react-router';
import { UsersListContainer } from '../other/UsersListContainer';
import { NoRecord } from '../../../components/widgets/NoRecord';
import { LandingContent } from '../other/LandingContent';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { time } from '../../../utils/time/Time';


let storeWeekDays = [];
let storeWeekDaysKey = [];
let storeMonthDays = [];
export const Schedules = () =>{
    const history = useHistory();
    
    const { user } = useAuth();

    const [never, setNever] = useState(true);
    const [on, setOn] = useState(false);
    const [after, setAfter] = useState(false);
    const [activeMonth, setActiveMonth] = useState(false);
    const [weekLabel, setWeekLabel] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [schedulesWidthIndividualTime, setSchedulesWidthIndividualTime] = useState([]);

    const [startAtError, setStartAtError] = useState("");
    const [endAtError, setEndAtError] = useState("");
    const [startAfterError, setStartAfterError] = useState("");
    const [showAlert, setShowAlert] = useState({state: false, message: ""});
    const [showAddTimeToCalendar, setShowAddTimeToCalendar] = useState({state: false, schedule: null});

    const clearDatePickerRef = useRef();
    const repeatSelectRef = useRef();
    const repeatAtDateRef = useRef();
    const startAtRef = useRef();
    const endAtRef = useRef();
    const repeatEveryRef = useRef();

    const userSelectedRef = useRef();

    const onUpdateComplete = async() =>{
        storeWeekDays = [];
        storeWeekDaysKey = [];
        WEEK_ABRIV.forEach((day)=>{
            document.getElementById(day).style.color = "";
            document.getElementById(day).style.backgroundColor = "";
        });
        setSchedulesWidthIndividualTime([]);
        clearDatePickerRef.current.click();
        await onSelectUser(userSelectedRef.current);
    }

    const toggleWeekOrMonth = (cmd, days=null) =>{
        if (cmd === "month"){
            storeWeekDays = [];
            storeMonthDays = tools.buildScheduleDaysForDb(days);
            setActiveMonth(true);
            WEEK_ABRIV.forEach((day)=>{
                document.getElementById(day).style.color = "";
                document.getElementById(day).style.backgroundColor = "";
            });
        }else{
            storeMonthDays = [];
            setActiveMonth(false);
            clearDatePickerRef.current.click();
        }
    }

    const toggleWeekDay = (sDay) =>{
        toggleWeekOrMonth("week");
        const element = document.getElementById(sDay);
        if (storeWeekDaysKey.includes(sDay)){
            element.style.color = "";
            element.style.backgroundColor = "";
            let temp = [];
            storeWeekDaysKey = [];
            for (let d of storeWeekDays){
                if (d !== sDay){
                    temp.push(d);
                    storeWeekDaysKey.push(d);
                }
            }
            storeWeekDays = tools.buildScheduleDaysForDb(temp);
        }else{
            element.style.color = "white";
            element.style.backgroundColor = "dodgerblue";
            storeWeekDays.push(tools.buildScheduleDaysForDb([sDay])?.[0]);
            storeWeekDaysKey.push(sDay);
        }
    }

    const toggleRepeat = (cmd) =>{
        if (cmd === REPEAT[0] && !never){
            setNever(true);
            setOn(false);
            setAfter(false);
        }if (cmd === REPEAT[1] && !on){
            setNever(false);
            setOn(true);
            setAfter(false);
        }if (cmd === REPEAT[2] && !after){
            setNever(false);
            setOn(false);
            setAfter(true);
        }
    }

    const toggleSelectWeek = (week) =>{
        setWeekLabel(week.replace("ly","").toLowerCase());
    }

    const submitHandler = async() =>{
        setStartAfterError("");
        setStartAtError("");
        setEndAtError("");

        const isOn = never && false || on && true || after && repeatAtDateRef.current.value;
        const repeatOn = !never? repeatSelectRef.current.value: null

        let STATE = true;
        if (repeatOn && !isOn){
            STATE = false;
            setStartAfterError("Recurrence time was not choosen.");
        }if (!startAtRef.current.value && !schedulesWidthIndividualTime.length){
            STATE = false;
            setStartAtError("  ");//keep space in string..
        }if (!endAtRef.current.value && !schedulesWidthIndividualTime.length){
            STATE = false;
            setEndAtError("  ");//keep space in string..
        }
        if (!userSelectedRef.current?.id){
            STATE = false;
            alert("A user was not selected");
        }

        if (!STATE) return;

        if (schedulesWidthIndividualTime.length){
            if (storeMonthDays.length) storeMonthDays = schedulesWidthIndividualTime;
            if (storeWeekDays.length) storeWeekDays = schedulesWidthIndividualTime;
        }else{
            const days = storeMonthDays.length && storeMonthDays || storeWeekDays.length && storeWeekDays;
            const schedWithSameTimes = tools.buildScheduleFromAndToTime(
                days,
                startAtRef.current.value,
                endAtRef.current.value
            );
            if (storeMonthDays.length) storeMonthDays = schedWithSameTimes;
            if (storeWeekDays.length) storeWeekDays = schedWithSameTimes;
        }

        await addSchedule({
            repeat: repeatOn,//set date to start repeat
            on: isOn,
            date: time.toDigits(),
            repeatEvery: never? null: repeatEveryRef.current.value,
            daysInMonth: storeMonthDays,
            daysInWeek: storeWeekDays,
        }, userSelectedRef.current?.id);
        
        await onUpdateComplete();
    }

    const onSelectUser = async(uUser) =>{
        userSelectedRef.current = uUser;
        const sched = await getSchedule(uUser?.id);
        setSchedules(tools.buildScheduleForUi(sched));
    }

    const onOpenAddUIndividualTime = () =>{
        if (!storeMonthDays.length && !storeWeekDays.length){
            return setShowAlert({
                state: true,
                message: "Scheduling day('s) is require. Select from the calendar or the week days then try again."
            });
        }
        const sched = storeMonthDays.length && storeMonthDays || storeWeekDays.length && storeWeekDays;
        setShowAddTimeToCalendar({state: true, schedule: sched});
    }

    const triggerSelect = (uUser) =>{
        try{
            onSelectUser(uUser);
        }catch(error){
            alert(error);
        }
    }

    useEffect(()=>{
        if (history.location?.user){
            let sUser = history.location?.user;
            triggerSelect(sUser);
        }
    }, []);

    return(
        <AdminNavBar useContact>
            <UsersListContainer onSelected={onSelectUser} defaultHighlightUserId={userSelectedRef.current?.id} useRefresh noMultiSelect >
                <div className="schedule-container">
                    <div className="schedule-calendar-container">
                        <div style={{color:"var(--primary-color)",fontSize:"20px",marginBottom:"20px"}}>
                            <b>{activeMonth?"Schedule by month":"Schedlute by week"}('s)</b>
                        </div>
                        <DaysPicker
                            clearRef={clearDatePickerRef}
                            onSelect={(days)=>toggleWeekOrMonth("month", days)}
                            style={{border:activeMonth && "1px solid var(--primary-color)"}}
                        />
                        <div className="">
                            <div className="flex" style={{padding:"2px",border:!activeMonth? "1px solid var(--primary-color)": "1px solid var(--bg)"}}>
                                {WEEK_ABRIV.map((day, key)=>(
                                    <div onClick={()=>toggleWeekDay(day)} className="week-day" id={day} key={key}>{day}</div>
                                ))}
                            </div>
                            <div className="flex relative" style={{marginTop:"10px"}}>
                                <div hidden className="float-top-right">
                                    <Button onClick={onOpenAddUIndividualTime} label="Individual time" />
                                </div>
                                <div style={{}}>
                                    <div>From</div>
                                    <TimePicker inputRef={startAtRef} error={startAtError} clearError={setStartAtError} info="Select a start time" />
                                </div>
                                <div style={{marginLeft:"10px"}}>
                                    <div>To</div>
                                    <TimePicker inputRef={endAtRef} error={endAtError} clearError={setEndAtError} info="Select a end time" />
                                </div>
                                {false && <WidgetsInfo style={{marginTop:"40px"}} info="Select {from and to} time entry or choose individual time button to add individual time to date selected.">
                                    <BsQuestionCircle style={{fontSize:"25px",marginLeft:"10px",color:"var(--primary-color)"}} />
                                </WidgetsInfo>}
                            </div>
                            <div><b>Reapeat</b></div>
                            <SelectOptions onChange={toggleSelectWeek} inputRef={repeatSelectRef} options={["Weekly", "Monthly", "Yearly"]} disable={never} info="Select repeat" />
                            <div className="">
                                <span>Repeate every</span>
                                <Entry inputRef={repeatEveryRef} disable={never} number defaultValue={1} label={weekLabel || "week"} width="40" style={{marginLeft:"10px",marginRight:"10px"}} info="Enter repeat count" />
                            </div>
                            <div className="pad-mini"><RadioButton onClick={()=>toggleRepeat(REPEAT[0])} parentCss="" label={REPEAT[0]} value={never} info="Never repeat" /></div>
                            <div className="pad-mini"><RadioButton onClick={()=>toggleRepeat(REPEAT[1])} parentCss="" label={REPEAT[1]} value={on} info="Always repeat" /></div>
                            <div className="pad-mini">
                                <RadioButton onClick={()=>toggleRepeat(REPEAT[2])} parentCss="" label={REPEAT[2]} value={after} info="Repeat until contistion reach" />&nbsp;&nbsp;&nbsp;
                                <DateEntry inputRef={repeatAtDateRef} disable={!after} error={startAfterError} clearError={setStartAfterError} info="Set time to start repeat" />
                            </div>
                            <div style={{textAlign:"right",paddingRight:"20px",marginTop:"10px"}}>
                                <Button onClick={submitHandler} label="Schedule" info="Save changes" />
                            </div>
                        </div>
                    </div>
                    <div className="max-width">
                        <Profile 
                            floatLeft 
                            image={userSelectedRef.current?.info?.image}
                            firstName={userSelectedRef.current?.info?.firstName} 
                            lastName={userSelectedRef.current?.info?.lastName} 
                            role={userSelectedRef.current?.info?.role} 
                        />
                        <div className="schedule-options no-event" style={{marginTop:"10px",color:"var(--primary-color"}}>
                            <div><MdDateRange style={{fontSize:"20px"}} /><b>Date</b></div>
                            <div><WiTime2 style={{fontSize:"20px"}} /><b>Start Time</b></div> 
                            <div><WiTime8 style={{fontSize:"20px"}} /><b>End Time</b></div>
                            <div><IoMdInformationCircleOutline style={{fontSize:"20px"}} /><b>Information</b></div>
                        </div>
                        <div className="schedule-options-container">
                            {
                                schedules.length?
                                schedules.map((sched, key)=>(
                                    <div className="schedule-options" key={key} >
                                        <div style={{borderRight:"1px solid lightgray"}}>{sched?.date}</div>
                                        <div style={{borderRight:"1px solid lightgray"}}>{sched?.startTime}</div> 
                                        <div style={{borderRight:"1px solid lightgray"}}>{sched?.endTime}</div>
                                        <div style={{borderRight:"1px solid lightgray"}} className="max-width">{sched?.info}</div>
                                    </div>
                                )):
                                <LandingContent />
                            }
                        </div>
                    </div>
                </div>
                <Alert
                    isOpen={showAlert.state}
                    onClose={()=>setShowAlert({state: false, message: ""})}
                    message={showAlert.message}
                />
                <AddTimeToCalendarDays
                    isOpen={showAddTimeToCalendar.state}
                    onClose={()=>setShowAddTimeToCalendar({state: false, schedule: null})}
                    days={showAddTimeToCalendar.schedule}
                    onApplied={setSchedulesWidthIndividualTime}
                />
            </UsersListContainer>
        </AdminNavBar>
    )
}