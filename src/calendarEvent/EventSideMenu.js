import React from 'react';
import { AiTwotoneBank } from 'react-icons/ai';

export const EventSideMenu = ({selectMultiple}) =>{
    const buttons = [
        {
            title: !selectMultiple?.state
            ?"Select Multiple"
            :"Deselect Multiple",
            state: null,
            action: selectMultiple?.action
        }
    ];
    return(
        <div className="event-side-menu">
            <div>title</div>
            {buttons.map((btn, key)=>(
                <div onClick={btn.action} className="event-side-menu-btn" key={key}>
                    <div className="float-center">{btn.title}</div>
                </div>
            ))}
        </div>
    )
}