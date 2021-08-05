import React, { createContext, useContext, useRef, useState } from 'react';
import { tools } from '../../utils/tools/Tools';


const ErrorHandlerSate = createContext();
export const useError = () => useContext(ErrorHandlerSate);

let extentionRequire = "";
let holdError = [];
export const ErrorHandler = ({children}) =>{
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);

    const errorClearRef = useRef();

    const setPayload = (msg) =>{
        setIsError(true);
        holdError.push(msg);
    }

    const clearPayload = () =>{
        holdError = [];
        extentionRequire = "";
        setError(holdError);
        setIsError(false);
    }

    const config = () =>{
        let msg = holdError;
        let firstElem = msg.shift();
        let lastElem = msg.pop();
        let msgConfig = `${firstElem.replace(".","")}
            ${tools.remCharInArr(".",msg).join(", ")} and 
            ${lastElem.replace(".","")}.`;
        return msgConfig;
    }

    const require = (msg) =>{
        if (extentionRequire){
            return msg.replace(".","") + " "+extentionRequire.replace(".","") + ".";
        }
        return msg;
    }
    
    const processPayload = () =>{
        if (!holdError.length) return;
        if (holdError.length === 1){
            setError(require(holdError[0]));
        }else if (holdError.length === 2){
            setError(require(holdError[0] + " and" + holdError[1]));
        }else{
            setError(require(config()));
        }
        holdError = [];
        extentionRequire = "";
        clearTimeout(errorClearRef.current);
        errorClearRef.current = setTimeout(() => {
            setError("");
        }, 5000);
    }

    const checkObject = (object, endOfMsg = "is required.") =>{
        let STATE = true;
        for (let key of Object.keys(object || {})){
            if (!object[key]){
                STATE = false;
                setPayload(key);
            }
        }
        if (!STATE) extentionRequire = endOfMsg;
        return STATE;
    }

    const providerValue = {
        error,
        isError,
        setPayload,
        processPayload,
        clearPayload,
        checkObject
    }
    return(
        <ErrorHandlerSate.Provider value={providerValue}>
            {children}
        </ErrorHandlerSate.Provider>
    )
}