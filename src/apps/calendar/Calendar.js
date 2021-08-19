import { useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {AiOutlineClose} from 'react-icons/ai';

export const Calendar = ({isOpen, onClose, closeOnSelect, onSelect}) =>{
    const [value, setValue] = useState(new Date());
    const tiggerSelect = (dateValue) =>{
        onSelect?.(dateValue);
        if (closeOnSelect) onClose?.();
    }
    useEffect(()=>{
        onSelect?.(value);
    }, []);
    return(
        <div hidden={!isOpen} className="float-center" style={{zIndex:"999"}}>
            <div style={{textAlign:"right",backgroundColor:"white",border:"1px solid lightgray"}}>
                <label style={{float:"left"}}>Calendar</label>
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