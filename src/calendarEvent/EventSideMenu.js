import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export const EventSideMenu = ({onAsign, onClose, usersSelected}) =>{
    
    return(
        <div className="event-side-menu">
            <div className="relative" style={{width:"100px",padding:"10px"}}>
                <AiOutlineClose onClick={onClose} className="float-top-right hide-on-desktop" style={{color:"red",margin:"3px",zIndex:"9999"}} />
                <div>title</div>
                <div className="event-side-menu-btn">
                    <div className="float-center">
                        <button onClick={onAsign} className="btn btn-hover" style={{color:"teal"}}>Asign</button>
                    </div>
                </div>
                
                <div className="event-side-menu-user-list scrollbar">
                    {usersSelected?.map((user, key)=>(
                        <div className="btn-hover" key={key}>{`${user?.info?.firstName} ${user?.info?.lastName}`}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}