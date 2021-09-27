import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Backdrop } from '../../container/Backdrop';


export const EllipsisMenu = ({hidden, options}) =>{
    const [showOption, setShowOption] = useState(false);

    return(
        <>
        <div hidden={hidden} className=" relative no-wrap" style={{float:"right"}}>
            <HiDotsVertical onClick={()=>setShowOption(true)} className="icons" style={{fontSize:"25px",right:"10px"}} />
        </div>
        <Backdrop isOpen={showOption} onClose={()=>setShowOption(false)} onTop >
            <div className="float-top-right" style={{top:"50px",right:"5px"}}>
                {options?.map((opt, key)=>(
                    <div onClick={()=>opt?.action?.()} className="option-menu-button" key={key}>{opt?.title}</div>
                ))}
            </div>
        </Backdrop>
        </>
    )
}