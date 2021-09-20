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
import { addBreak, endBreak, getBreak } from '../../database/break/Break';
import { Alert } from '../../components/other/Alert';


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
            start: tools.time.digits(),
            end: "none"//NOTE: remain string "none"
        });
    }

    const addEndTimeLog = async() =>{
        await addEndLog({end: tools.time.digits()}, user?.id);
    }

    const onStart = async() =>{
        if (!isActive()){
            setStartAt(tools.time.time())
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
            setEndAt(tools.time.time());
            stopTimer();
            token.clear();
            await endingBreak();
            await addEndTimeLog();
        }else{
            setAlert({state:true, message:"Already ended"});
        }
    }

    const startingBreak = async() =>{
        await addBreak({
            id: user?.id,
            start: tools.time.digits(),
            end: "none"//NOTE: remain string "none"
        });
        setIsPause(true);
    }

    const endingBreak = async() =>{
        await endBreak({
            end: tools.time.digits()
        }, user?.id);
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
        const time = await getInProgressLog(user?.id);
        setStartAt(tools.time.time(time?.[0]?.info?.start) || "");
    }

    const isActive = () =>{
        return token.isActive(user?.email);
    }

    const pingStatus = () =>{
        if (isPause) return "yellow";
        else if (isTimerActive()) return "green";
        else return "blue"
    }

    const initIsBreak = async() =>{
        const breaks = await getBreak(user?.id);
        if (breaks.length) setIsPause(true);
    }

    useEffect(()=>{
        if (!isActive()) stopTimer();
        else setStartTime();
    }, []);
 
    useEffect(() => {
        initIsBreak();
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
                        <TimerComponent labels={{ minutes: 'min' }}/>
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
                    <TrackerButton hidden={isPause} onClick={onPause} label="PAUSE" style={{margin:"10px"}} color="yellow" />
                    <TrackerButton hidden={!isPause} onClick={onPlay} label="PLAY" style={{margin:"10px"}} color="blue" />
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