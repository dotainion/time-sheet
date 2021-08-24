import React, { useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';


export const WhatsThis = ({info}) =>{
    const [showInfo, setShowInfo] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    return(
        <div className="relative inline">
            <BsQuestionCircle 
                style={{marginLeft:"5px",color:"yellow"}} 
                onClick={()=>setShowDetails(true)}
                onMouseEnter={()=>setShowInfo(true)} 
                onMouseLeave={()=>setShowInfo(false)}
            />
            <div 
                hidden={!showInfo} 
                className="float-bottom-overflow" 
                style={{
                    fontSize:"12px",
                    bottom:"-10px",
                    backgroundColor:"white",
                    color:"black",
                    padding:"3px",
                    borderRadius:"3px",
                    minWidth: "150px",
                    maxWidth:"300px",
                    zIndex:"9999999999"
                }}
            >{info || "What is this?"}</div>
        </div>
    )
}