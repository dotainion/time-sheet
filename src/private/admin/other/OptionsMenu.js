import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { Backdrop } from '../../../container/Backdrop';
import { time } from '../../../utils/time/Time';
import { GiCoffeeCup } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { IoGitPullRequest } from 'react-icons/io5';
import { WidgetsInfo } from '../../../components/widgets/WidgetsInfo';


export const OptionsMenu = ({options, onRequests, hideRequest, borderInherit}) =>{
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
        <div onClick={e=>e.stopPropagation()} className="relative" style={{border: borderInherit? "": "none",borderBottom: borderInherit && "1px solid lightgray",color:"var(--primary-color)"}}>
            <div className="float-left" style={{border:"none",fontSize:"20px",zIndex:"99"}}>
                <WidgetsInfo inline style={{border:"none"}} infoStyle={{border:"none"}} errorStyle={{border:"none"}} info="Breaks">
                    <GiCoffeeCup onClick={()=>options?.length && setShowOption(true)} style={{cursor:"pointer"}} />
                </WidgetsInfo>
                <WidgetsInfo inline style={{border:"none", display:hideRequest && "none"}} infoStyle={{border:"none"}} errorStyle={{border:"none"}} info="Requst time change">
                    <IoGitPullRequest onClick={onRequests} style={{marginLeft:"10px", cursor:"pointer"}} />
                </WidgetsInfo>
            </div>
            <div hidden={options?.length} className="float-left" style={{color:"red",width:"auto",zIndex:"991"}}><MdClose/></div>
        </div>
        <Backdrop isOpen={showOption} onClose={(e)=>{e.stopPropagation();setShowOption(false)}} onTop >
            <div onClick={e=>e.stopPropagation()} className="float-center" style={styles}>
                <div style={{}}>
                    {
                        options?.length?
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