import React, { useEffect, useRef, useState } from 'react';
import { AdminNavBar } from '../../container/AdminNavBar';
import { Button } from '../../components/widgets/Buttons';
import { IconButton } from '../../components/widgets/IconButon';
import { InputCheckbox } from '../../components/widgets/InputCheckbox';
import { NoRecord } from '../../components/widgets/NoRecord';
import { SearchBar } from '../../components/widgets/SearchBar';
import { WidgetsInfo } from '../../components/widgets/WidgetsInfo';
import { getUsers } from '../../database/accounts/AccountsDb';
import { xlFile } from '../../files/ExcelFile';
import { useAuth } from '../../state/auth/Authentication';
import { getLogsRange, updateLog } from '../../database/logs/LogDb';
import { DateEntry } from '../../components/widgets/DateEntry';
import defaultImage from '../../images/default-profile-image.png';
import { LoadingBar } from '../../components/widgets/LoadingBar';
import { time } from '../../utils/time/Time';
import $ from 'jquery';
import { HiDotsVertical } from 'react-icons/hi';
import { OptionsMenu } from '../../components/widgets/OptionsMenu';
import { useStore } from '../../state/stateManagement/stateManagement';
import { TimePicker } from '../../components/widgets/TimePicker';
import { UserNavBar } from '../../container/UserNavBar';
import { getSchedule } from '../../database/schedules/SchedulesDb';
import { DaysPicker } from '../../apps/calendar/Calendar';



export const TimeSheet = () =>{
    const { user } = useAuth();

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scheduleDates, setScheduleDates] = useState([]);

    const initSchedule = async() =>{
        setLoading(true);
        const schdArray = await getSchedule(user?.id)
        const schedls = schdArray?.daysInWeek?.length && schdArray?.daysInWeek || 
                        schdArray?.daysInMonth?.length && schdArray?.daysInMonth || [];
        setSchedules(schedls);
        let dateTemp = [];
        schedls.forEach((date)=>{
            dateTemp.push(new Date(date?.date));
        })
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

