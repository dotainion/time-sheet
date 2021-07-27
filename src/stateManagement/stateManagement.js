import React, { createContext, useContext, useState } from 'react';
import { tools } from '../tools/Tools';

const Management = createContext();
export const useStateMangement = () => useContext(Management);

const initTime = tools.time.digits(new Date().toLocaleDateString());
export const StateMangement = ({children}) =>{
    const [dateObject, setDateObject] = useState({from: initTime, to: initTime});
    
    const providerValue = {
        dateObject,
        setDateObject
    }
    return(
        <Management.Provider value={providerValue}>
            {children}
        </Management.Provider>
    )
}