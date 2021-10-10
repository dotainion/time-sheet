import React, { useEffect, useRef, useState } from 'react';
import Clock from 'react-clock';
import StopClock from 'react-stop-clock';
import 'react-clock/dist/Clock.css';
import { token } from '../../utils/token/Tokenize';
import { useAuth } from '../../state/auth/Authentication';
import { UserNavBar } from '../../container/UserNavBar';
import { tools } from '../../utils/tools/Tools';
import { addEndLog, addStartLog, getInProgressLog } from '../../database/logs/LogDb';
import { TrackerButton } from '../widgets/TrackerButton';
import { SiSatDot1 } from 'react-icons/si';
import { Alert } from '../../components/other/Alert';
import { time } from '../../utils/time/Time';

const {
    TimerComponent,
    isTimerActive,
    stopTimer,
    startTimer,
    getCurrentTimeInSeconds 
} = new StopClock({
    id: 1,
    presist: true,
    onTick: (e) => {
    //console.log(e)
    }
});


let IN_PROGRESSING_LOG = [];
export const Clocked = () =>{
    const { user } = useAuth();

    const [value, setValue] = useState(new Date());
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [isPause, setIsPause] = useState(false);
    const [alert, setAlert] = useState({state: false, message: ""});

    const addStartTimeLog = async() =>{
        await addStartLog({
            id: user?.id,
            email: user?.email,
            start: time.toDigits(),
            end: "none"//NOTE: remain string "none"
        });
    }

    const addEndTimeLog = async() =>{
        await addEndLog({end: time.toDigits()}, user?.id);
    }

    const onStart = async() =>{
        if (!isActive()){
            setStartAt(time.time())
            startTimer();
            token.set(user?.email);
            await addStartTimeLog();
            window.location.reload();
        }else{
            setAlert({state:true, message:"Already started"});
        }
    }

    const onEnd = async() =>{
        if (isActive()){
            setEndAt(time.time());
            stopTimer();
            token.clear();
            await endingBreak();
            await addEndTimeLog();
        }else{
            setAlert({state:true, message:"Already ended"});
        }
    }

    const startingBreak = async() =>{
        let sBreak = IN_PROGRESSING_LOG?.break || [];
        sBreak.push({start: time.toDigits(), end: ""});
        await addEndLog({break: sBreak}, user?.id);
        IN_PROGRESSING_LOG["break"] = sBreak;
        setIsPause(true);
    }

    const endingBreak = async() =>{
        let sBreak = IN_PROGRESSING_LOG?.break || [];
        let holdBreaks = [];
        for (let obj of sBreak){
            if (!obj?.end){
                holdBreaks.push({start: obj?.start, end: time.toDigits()});
            }else holdBreaks.push(obj);
        } 
        await addEndLog({break: holdBreaks}, user?.id);
        IN_PROGRESSING_LOG["break"] = holdBreaks;
        setIsPause(false);
    }

    const onPause = async() =>{
        if (isActive() && !isPause) startingBreak();
        else setAlert({
            state:true, 
            message:"Time not started"
        });
    }

    const onPlay = async() =>{
        if (isActive() && isPause) endingBreak();
        else setAlert({
            state:true, 
            message:"Time not started"
        });
    }

    const setStartTime = async() =>{
        IN_PROGRESSING_LOG = await getInProgressLog(user?.id);
        setStartAt(time.toTimeString(IN_PROGRESSING_LOG?.[0]?.info?.start) || "");
    }

    const isActive = () =>{
        return token.isActive(user?.email);
    }

    const pingStatus = () =>{
        if (isPause) return "yellow";
        else if (isTimerActive()) return "green";
        else return "blue"
    }

    useEffect(()=>{
        if (!isActive()) stopTimer();
        else setStartTime();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()),1000);
        return () => {clearInterval(interval);}
    }, []);
    return(
        <UserNavBar>
            <div style={{textAlign:"center"}}>
                <p style={{fontSize:"30px"}}><b>Current time</b></p>
                <div className="float-top-left no-select" style={{textAlign:"left"}}>
                    <div className="clock-status-container">
                        <div>START AT: {startAt}</div>
                        <div>END AT: {endAt}</div>
                    </div>
                    <div className="lapstime">
                        <TimerComponent labels={{ minutes: 'min' }} />
                        <div hidden={isTimerActive()} className="max-size float-center">
                            <div className="max-size relative" style={{backgroundColor:"white"}}>
                                <div className="float-center">Start your day</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <SiSatDot1 className="pad" style={{textAlign:"left",color:pingStatus()}}/>
                        <div className="relative">
                            <div className="float-left">{isTimerActive()? isPause? "Pause": "Active": "Status"}</div>
                        </div>
                    </div>
                </div>
                <Clock value={value} className="class1 class2 class3" size={300} />                
                <div className="flex centered" style={{width:"330px",marginTop:"40px"}}>
                    <TrackerButton onClick={onStart} label="START" style={{margin:"10px"}} color="green" />
                    <TrackerButton hidden={isPause} onClick={onPause} label="BREAK" style={{margin:"10px"}} color="yellow" />
                    <TrackerButton hidden={!isPause} onClick={onPlay} label="RETURN" style={{margin:"10px"}} color="blue" />
                    <TrackerButton onClick={onEnd} label="END" style={{margin:"10px"}} color="red" />
                </div>
            </div>
            <Alert
                isOpen={alert.state}
                onClose={()=>setAlert({state: false, message: ""})}
                message={alert.message}
            />
        </UserNavBar>
    )
}