import React, { useEffect, useState } from 'react';
import { NoRecord } from '../../components/widgets/NoRecord';
import { useAuth } from '../../state/auth/Authentication';
import { LoadingBar } from '../../components/widgets/LoadingBar';
import { time } from '../../utils/time/Time';
import { UserNavBar } from '../../container/UserNavBar';
import { getSchedule, updateSchedule } from '../../database/schedules/SchedulesDb';
import { DaysPicker } from '../../apps/calendar/Calendar';



export const TimeSheet = () =>{
    const { user } = useAuth();

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scheduleDates, setScheduleDates] = useState([]);

    const checkRepeat = (date) =>{
        const nowDate = new Date();
        const schedDate = new Date(date?.date);
        if (//check if date ent reach yet
            schedDate.getMonth() < nowDate.getMonth() && 
            schedDate.getFullYear() < nowDate.getFullYear()
            ){
                date["pending"] = true;
                return date;
        }else if (//check if date reach
            schedDate.getMonth() === nowDate.getMonth() && 
            schedDate.getFullYear() === nowDate.getFullYear() && 
            schedDate.getDate() === nowDate.getDate()
            ){
                date["due"] = true;
                return date;
        }else if (//check if month reach but day ent reach yet
            schedDate.getMonth() === nowDate.getMonth() && 
            schedDate.getFullYear() === nowDate.getFullYear() && 
            schedDate.getDate() < nowDate.getDate()
            ){
                date["pending"] = true;
                return date;
        }else if (//check if date already pass aready
            schedDate.getMonth() > nowDate.getMonth() || 
            schedDate.getFullYear() > nowDate.getFullYear()
            ){
                date["pastDue"] = true;
                return date;
        }else if (//check if month reach but date pass aready
            schedDate.getMonth() > nowDate.getMonth() || 
            schedDate.getFullYear() > nowDate.getFullYear() && 
            schedDate.getDate() > nowDate.getDate()
            ){
                date["pastDue"] = true;
                return date;
        }

        return date;
    }

    const checkRepeatEvery = (sched) =>{
        //this funtion is not ready and need re work
        const addWeek = (date=null) =>{
            if (entryDate.getMonth() >= new Date(date).getMonth() && 
                entryDate.getFullYear() >= new Date(date).getFullYear() && 
                entryDate.getDate() >= new Date(date).getDate()){
                return;
            }
            entryDate.setDate(entryDate.getDate() + (sched?.repeatEvery * 7));
            addWeek(date);
        }

        const entryDate = new Date(sched?.date);
        if (sched?.repeatEvery){
            //update new feild with date to skip or repeat
            const isRepeatEvery = checkRepeat({date: sched?.repeatEvery});
            if (!isRepeatEvery?.due || !isRepeatEvery?.pastDue){
                return false;
            }
            addWeek(sched?.repeatOnEvery);
            updateSchedule({repeatOnEvery: time.toDigits(entryDate)}, user?.id);
            return true;
        }
        return false;
    }

    const isReacurrence = (sched) =>{
        let schedulesAccurrenceList = [];
        const weeks = sched?.daysInWeek;
        const months = sched?.daysInMonth;
        const schedulesList = weeks?.length && weeks || months?.length && months || [];
        if (sched?.on){
            if (sched?.repeat){
                const repSched = checkRepeat(sched?.repeat);
                if (repSched?.due || repSched?.pastDue){
                    // do something when schedule starts
                    if (!checkRepeatEvery(sched)){
                        // return row list for now
                        return schedulesList;
                    }

                    let cheduleRepeatList = [];
                    for (let date of schedulesList){//add current month to date to immitate repeat
                        const d = new Date(date?.date);
                        d.setMonth(new Date().getMonth());
                        date["date"] = time.toDateString(d);
                        cheduleRepeatList.push(date);
                    }
                    return cheduleRepeatList;
                }
                // do something when schedule has not reach yet ... note return row list for now
                return schedulesList;
            }
        }
        for (let date of schedulesList){
            schedulesAccurrenceList.push(
                checkRepeat(date)
            );
        }
        
        return schedulesAccurrenceList;
    }

    const initSchedule = async() =>{
        setLoading(true);
        const scheduleReseult = await getSchedule(user?.id);
        const scheduleDatesArray = isReacurrence(scheduleReseult);
        setSchedules(scheduleDatesArray);
        
        let dateTemp = [];
        scheduleDatesArray.forEach(date => dateTemp.push(new Date(date?.date)));
        setScheduleDates(dateTemp);
        setLoading(false);
    }
  
    useEffect(()=>{
        initSchedule();
    }, []);

    return(
        <UserNavBar>
            <div className="no-select">
                <div className="flex max-width" style={{marginTop:"40px"}}>
                    <div className="pad">
                        <DaysPicker defaultDates={scheduleDates} viewOnly />
                    </div>
                    <div className="pad max-width">
                        <div className="log-record" style={{marginRight:"17px"}}>
                            <div><b>Date</b></div>
                            <div><b>Start</b></div>
                            <div><b>End</b></div>
                            <div><b>Total Hours</b></div>
                        </div>
                        <div className="log-record-scroller">
                            {
                                schedules.length?
                                schedules.map((log, key)=>(
                                    <div key={key}>
                                        {
                                            <div className="log-record">
                                                <div className="relative">{log?.date}</div>
                                                <div className="relative">{log?.startTime}</div>
                                                <div className="relative">{log?.endTime}</div>
                                                <div className="relative">{time.sub(log?.endTime, log?.startTime)}</div>
                                            </div>
                                        }
                                    </div>
                                )):
                                <NoRecord
                                    icon="logs"
                                    header="No logs to show" 
                                    subMessage="No records available"
                                    message=""
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LoadingBar isOpen={loading} />
        </UserNavBar>
    )
}

