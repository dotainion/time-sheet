import React, { useEffect, useRef, useState } from 'react';
import Clock from 'react-clock';
import StopClock from 'react-stop-clock';
import 'react-clock/dist/Clock.css';
import { token } from '../../utils/token/Tokenize';
import { useAuth } from '../../state/auth/Authentication';
import { UserNavBar } from '../../container/UserNavBar';
import { tools } from '../../utils/tools/Tools';
import { addEndLog, addStartLog, getInProgressLog } from '../../database/logs/LogDb';


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

    const startRef = useRef();
    const endRef = useRef();

    const addStartTimeLog = async() =>{
        await addStartLog({
            id: user?.id,
            email: user?.email,
            start: tools.time.digits(),
            end: "none"//todo: remain string "none"
        });
    }

    const addEndTimeLog = async() =>{
        await addEndLog({end: tools.time.digits()}, user?.id);
    }

    const onStart = async() =>{
        if (!isActive()){
            startRef.current.innerText = tools.time.time();
            startTimer();
            token.set(user?.email);
            await addStartTimeLog();
            window.location.reload();
        }else{
            alert("Already started");
        }
    }

    const onEnd = async() =>{
        if (isActive()){
            endRef.current.innerText = tools.time.time() || "";
            stopTimer();
            token.clear();
            await addEndTimeLog();
        }else{
            alert("Already ended");
        }
    }

    const setStartTime = async() =>{
        const time = await getInProgressLog(user?.id);
        startRef.current.innerText = tools.time.time(time?.[0]?.info?.start) || "";
    }

    const isActive = () =>{
        return token.isActive(user?.email);
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
                <p>Current time</p>
                <Clock value={value} className="class1 class2 class3" size={300} />                
                <div id="timerRef" className="lapstime">
                    <TimerComponent labels={{ minutes: 'min' }}/>
                </div>
                <div style={{}}>
                    <button onClick={onStart} className="time-btn btn-success relative">
                        <div className="float-center">
                            <div>Start</div>
                            <span ref={startRef} />
                        </div>
                    </button>
                    <button onClick={onEnd} className="time-btn btn-warning relative">
                        <div className="float-center">
                            <div>End</div>
                            <span ref={endRef} />
                        </div>
                    </button>
                </div>
            </div>
        </UserNavBar>
    )
}