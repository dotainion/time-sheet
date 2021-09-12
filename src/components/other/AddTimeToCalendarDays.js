import React, { useEffect, useState } from 'react';
import { SpanWrapper } from '../../container/SpanWrapper';
import { TimePicker } from '../widgets/TimePicker';
import { FaRegCommentDots } from 'react-icons/fa';
import { Button } from '../widgets/Buttons';
import { WidgetsInfo } from '../widgets/WidgetsInfo';
import { InputTextarea } from '../widgets/InputTextarea';


export const AddTimeToCalendarDays = ({isOpen, onClose, days, onApplied}) =>{
    const [scheduleDays, setScheduleDays] = useState([]);

    const updatetime = (cmd, value, index) =>{
        let tempArray = scheduleDays;
        if (cmd === "start") tempArray[index]["startTime"] = value;
        else tempArray[index]["endTime"] = value;
        setScheduleDays(tempArray);
    }

    const addComments = (value, index) =>{
        let tempArray = scheduleDays;
        tempArray[index]["info"] = value;
        setScheduleDays(tempArray);
    }

    const onApply = () =>{
        let tempArray = scheduleDays;
        onApplied?.(tempArray);
        onClose?.();
    }

    useEffect(()=>{
        if (days?.length){
            console.log(days)
            setScheduleDays(days);
        }
    }, [days, isOpen]);
    return(
        <SpanWrapper isOpen={isOpen} onClose={onClose}>
            <div
                className="relative"
                style={{
                    width: "420px",
                    padding: "20px",
                    borderRadius:"5px",
                    boxShadow:"2px 2px 10px var(--shadow-dark)"
                }}
            >
                <div style={{fontSize:"15px",color:"var(--primary-color)",borderBottom:"1px solid var(--primary-color)"}}><b>Update Schedlule</b></div>
                <div style={{overflowY: "auto",maxHeight: "400px"}}>
                    {
                        scheduleDays.length?
                        scheduleDays.map((day, key)=>(
                            <div className="flex" style={{borderBottom:"1px solid var(--border)"}} key={key}>
                                <div className="max-width relative">
                                    <div>{day?.date}</div>
                                    <WidgetsInfo info="Add comments">
                                        <FaRegCommentDots onClick={()=>{
                                            document.getElementById(`comment-box${key}`).hidden = false;
                                        }} style={{fontSize:"20px",marginTop:"8px"}} />
                                    </WidgetsInfo>
                                </div>
                                <div className="max-width">
                                    <div style={{marginBottom:"-15px"}}>Start</div>
                                    <TimePicker onChange={(date)=>{updatetime("start", date, key)}} />
                                </div>
                                <div className="max-width">
                                    <div style={{marginBottom:"-15px"}}>End</div>
                                    <TimePicker onChange={(date)=>{updatetime("end", date, key)}} />
                                </div>
                                <div hidden id={`comment-box${key}`} className="float-center pad-mini" style={{boxShadow:"2px 2px 10px var(--shadow",backgroundColor:"white",zIndex:"9"}}>
                                    <div style={{fontSize:"15px",color:"var(--primary-color)",borderBottom:"1px solid var(--primary-color)"}}><b>Add comments to schedlule</b></div>
                                    <InputTextarea id={`comment${key}`} inputStyle={{width:"300px", height:"100px"}} />
                                    <div className="pad" style={{textAlign:"right",marginTop:"-30px"}}>
                                        <Button onClick={()=>{
                                            document.getElementById(`comment-box${key}`).hidden = true;
                                        }} label="Cencel" style={{marginRight:"10px"}} />
                                        <Button onClick={()=>{
                                            let element = document.getElementById(`comment${key}`);
                                            addComments(element?.value, key);
                                            document.getElementById(`comment-box${key}`).hidden = true;
                                        }} label="Comment" />
                                    </div>
                                </div>
                            </div>
                        )):
                        <div>No Records</div>
                    }
                </div>
                <div style={{marginTop:"10px",textAlign:"right"}}>
                    <Button onClick={onApply} label="Apply Changes" />
                </div>
            </div>
        </SpanWrapper>
    )
}