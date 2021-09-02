import { useEffect, useRef, useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {AiOutlineClose} from 'react-icons/ai';

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