import React, { useEffect } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { useState } from 'react/cjs/react.development';
import { Backdrop } from '../../../container/Backdrop';
import { time } from '../../../utils/time/Time';



export const OptionsMenu = ({options}) =>{
    const [showOption,setShowOption] = useState(false);
    const [total, setTotal] = useState("");

    const styles = {
        width: "auto",
        border: "none",
        maxHeight: "60vh",
        overflowY: "auto",
        overflowX: "hidden",
        whiteSpace: "nowrap"
    }
    const totalStyles = {
        width: "auto",
        border: "none",
        paddingLeft: "10px",
        paddingRight: "10px",
    }
    const innerStyles = {
        width: "auto",
        border: "none",
        color: "white",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginLeft: "3px",
        borderRadius: "5px",
        backgroundColor:"rgb(0,0,0,0.70)"
    }
    const outerStyles = {
        border: "none",
        border: "none",
        display: "flex"
    }
    
    useEffect(()=>{
        let storeD = "";
        for (let br of options){
            if (!storeD) storeD = time.sub(br?.end, br?.start, true);
            else{
                let br2 = time.sub(br?.end, br?.start, true);
                storeD = time.add(storeD, br2);
            }
        }
        setTotal(storeD);
    }, [options]);

    return(
        <>
        <div onClick={e=>e.stopPropagation()} className="relative" style={{border:"none"}}>
            <HiDotsVertical onClick={()=>setShowOption(true)} className="float-left icons" style={{fontSize:"20px"}} />
        </div>
        <Backdrop isOpen={showOption} onClose={(e)=>{e.stopPropagation();setShowOption(false)}} >
            <div onClick={e=>e.stopPropagation()} className="float-center" style={styles}>
                <div style={styles}>
                    {
                        options.length?
                        options?.map((opt, key)=>(
                            <div style={outerStyles} key={key}>
                                <div style={innerStyles}>Start: {time.toTimeString(opt?.start)}</div>
                                <div style={innerStyles}>End: {time.toTimeString(opt?.end)}</div>
                                <div style={innerStyles}>Total: {time.sub(opt?.end, opt?.start, true)}</div>
                            </div>
                        )):
                        <div hidden={options?.length} style={totalStyles}>
                            <div style={innerStyles}>No data</div>
                        </div>
                    }
                </div>
                <div hidden={!options?.length} style={totalStyles}>
                    <div style={innerStyles}>Grand Total: {total}</div>
                </div>
            </div>
        </Backdrop>
        </>
    )
}