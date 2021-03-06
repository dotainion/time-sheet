import React, { useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { WidgetsInfo } from './WidgetsInfo';


export const WhatsThis = ({cssClass, style, info}) =>{
    return(
        <WidgetsInfo 
            onClick={e=>e.stopPropagation()} 
            info={info} 
            cssClass={cssClass} 
            style={{
                display:"inline-block",
                ...style
            }}
        >
            <BsQuestionCircle 
                style={{marginLeft:"5px"}} 
            />
        </WidgetsInfo>
    )
}