import React, { useEffect, useRef, useState } from 'react';
import Clock from 'react-clock';
import StopClock from 'react-stop-clock';
import 'react-clock/dist/Clock.css';
import { token } from '../token/Tokenize';
import { addEndLog, addStartLog } from '../database/dbActions';
import { useAuth } from '../auth/Authentication';
import { UserNavBar } from '../container/UserNavBar';
import { tools } from '../tools/Tools';


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
            end: "none"
        });
    }

    const addEndTimeLog = async() =>{
        await addEndLog({end: tools.time.digits(),}, user?.id);
    }

    const onStart = async() =>{
        if (!isActive()){
            startRef.current.innerText = tools.time.time();
            startTimer();
            token.set(user?.email);
            await addStartTimeLog();
            window.location.reload();
        }else{

        }
    }

    const onEnd = async() =>{
        if (isActive()){
            endRef.current.innerText = tools.time.time();
            stopTimer();
            token.clear();
            await addEndTimeLog();
        }else{
            
        }
    }

    const isActive = () =>{
        return token.isActive(user?.email);
    }

    useEffect(()=>{
        if (!isActive()) stopTimer();
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
                    <button onClick={onStart} className="time-btn btn-success">
                        <div>Start</div>
                        <span ref={startRef} />
                    </button>
                    <button onClick={onEnd} className="time-btn btn-warning">
                        <div>End</div>
                        <span ref={endRef} />
                    </button>
                </div>
            </div>
        </UserNavBar>
    )
}