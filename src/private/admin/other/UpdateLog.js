import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/widgets/Buttons';
import { DateEntry } from '../../../components/widgets/DateEntry';
import { TimePicker } from '../../../components/widgets/TimePicker';
import { Backdrop } from '../../../container/Backdrop';
import { BiTimer } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { IconButton } from '../../../components/widgets/IconButon';
import { time } from '../../../utils/time/Time';
import { updateLog } from '../../../database/logs/LogDb';
import { LoadingBar } from '../../../components/widgets/LoadingBar';


export const UpdateLog = ({isOpen, onUpdated, onClose, data}) =>{
    const [loading, setLoading] = useState(false);

    const dateRef = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();

    const buildTime = (dateObj, value) =>{
        const [hr, min, sec] = time.strip(value).split(":");
        let date = new Date(dateObj);
        date.setHours(hr);
        date.setMinutes(min);
        date.setSeconds(sec || 0);
        return time.toDigits(date);
    }

    const buildDate = (dateObj, value) =>{
        const [yr, m, d] = value.split("-");
        let date = new Date(dateObj);
        date.setFullYear(yr);
        date.setMonth(parseInt(m)-1);
        date.setDate(d);
        return time.toDigits(date);
    }

    const onUpdateLogs = async() =>{
        const startTimeBuild = buildTime(data?.info?.start, startTimeRef.current.value);
        const endTimeBuild = buildTime(data?.info?.end, endTimeRef.current.value);
        setLoading(true);
        await updateLog({
            start: buildDate(startTimeBuild, dateRef.current.value),
            end: buildDate(endTimeBuild, dateRef.current.value),
        }, data?.id);
        setLoading(false);
        onUpdated?.();
        onClose?.();
    }

    useEffect(()=>{
        if (Object.keys(data || {}).length){
            const timeObj = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
            dateRef.current.valueAsDate = new Date(data?.info?.start);
            startTimeRef.current.value = new Date(data?.info?.start).toLocaleString("sv-SE", timeObj);
            endTimeRef.current.value = new Date(data?.info?.end).toLocaleString("sv-SE", timeObj);
        }
    }, [data]);

    return(
        <Backdrop isOpen={isOpen}>
            <div onClick={e=>e.stopPropagation()} className="float-center pad no-select" style={{backgroundColor:"rgb(0, 0, 0, 0.50)",borderRight:"5px"}}>
                <AiOutlineClose onClick={onClose} className="float-top-right pad close" />
                <div className="flex no-wrap" style={{fontSize:"50px",color:"white"}}>
                    <div><BiTimer/></div>
                    <div className="header relative">
                        <div className="float-left pad">Update Log</div>
                    </div>
                </div>
                <div className="flex">
                    <div className="pad">
                        <div style={{color:"white"}}>Date</div>
                        <DateEntry inputRef={dateRef} />
                    </div>
                    <div className="pad">
                        <div style={{color:"white"}}>Start time</div>
                        <TimePicker inputRef={startTimeRef} />
                    </div>
                    <div className="pad">
                        <div style={{color:"white"}}>End time</div>
                        <TimePicker inputRef={endTimeRef} />
                    </div>
                </div>
                <div className="pad" style={{textAlign:"right", color:"white"}}>
                    <IconButton onClick={onUpdateLogs} label="Update log" icon="update" cssClass="log-header-btn-text relative" iconCss="float-left log-header-btn-icon" style={{color:"white"}} />
                </div>
            </div>
            <LoadingBar isOpen={loading} />
        </Backdrop>
    )
}