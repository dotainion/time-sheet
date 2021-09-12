import { useEffect, useRef, useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {AiOutlineClose} from 'react-icons/ai';
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { tools } from '../../utils/tools/Tools';

export const Calendar = ({isOpen, onClose, cssClass, closeOnSelect, onSelect, header, headerStyle}) =>{
    const [shouldOpen, setShouldOpen] = useState(false);
    const [value, setValue] = useState(new Date());
    const [spin, setSpin] = useState(false);

    const timeoutRef = useRef();

    const tiggerSelect = (dateValue) =>{
        onSelect?.(dateValue);
        if (closeOnSelect) onClose?.();
    }

    useEffect(()=>{
        if (spin){
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(()=>{
                setSpin(false);
            }, 250);
        }
    },[spin]);

    useEffect(()=>{
        if (isOpen){
            setSpin(true);
            setShouldOpen(true);
        }else{
            setShouldOpen(false);
        }
    }, [isOpen]);

    useEffect(()=>{
        onSelect?.(value);
    }, []);

    return(
        <div 
            hidden={!shouldOpen} 
            className={`float-center ${cssClass} ${spin && "spin"}`} 
            style={{zIndex:"999999999999999"}}
        >
            <div style={{textAlign:"right",...headerStyle || {backgroundColor:"white",border:"1px solid lightgray"}}}>
                <label style={{float:"left"}}>{header || "Calendar"}</label>
                <AiOutlineClose onClick={onClose} style={{color:"red"}} />
            </div>
            <ReactCalendar
                onChange={setValue}
                value={value}
                onClickDay={tiggerSelect}
            />
        </div>
    )
}

export const DaysPicker = ({onSelect, clearRef, style}) =>{
    const [dates, setDates] = useState([]);

    const storeKeyRef = useRef();
    const storeDateRef = useRef();

    const onTriggerSelect = (date) =>{
        if (storeKeyRef.current.includes(`${date}`)){
            storeDateRef.current = [];
            storeKeyRef.current = [];
            for (let dDate of dates){
                if (`${dDate}` !== `${date}`){
                    storeKeyRef.current = [`${dDate}`,...storeKeyRef.current];
                    storeDateRef.current = [dDate,...storeDateRef.current];
                }
            }
        }else{
            storeKeyRef.current = [`${date}`,...storeKeyRef.current];
            storeDateRef.current = [date,...storeDateRef.current];
        }
        setDates(storeDateRef.current);
        onSelect?.(storeDateRef.current);
    }

    const onClear = () =>{
        setDates([]);
        storeKeyRef.current = [];
        storeDateRef.current = [];
    }

    useEffect(()=>{
        storeKeyRef.current = [];
        storeDateRef.current = [];
    }, []);
    return(
        <div className="day-picker-container" style={{...style}}>
            <DayPicker
                selectedDays={dates}
                onDayClick={onTriggerSelect}
            />
            <div hidden ref={clearRef} onClick={onClear} />
        </div>
    )
}