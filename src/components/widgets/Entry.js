import React, { useRef } from 'react';
import { WidgetsInfo } from './WidgetsInfo';


export const Entry = ({startTyping, endTyping, inputRef, label, info, type, disable, width, password, defaultValue, error, clearError, number, style, value}) =>{
    const onTyping = () =>{
        startTyping?.();
    }
    const onChanged = (e) =>{
        clearError?.("");
        endTyping?.(e?.target?.value);
    }
    return(
        <WidgetsInfo info={!disable && info} error={error} inline>
            <input 
                className="input" 
                type={password && "password" || number && "number" || type || "text"} 
                style={{
                    width: width && `${width}px`,
                    cursor:"text",
                    ...style,
                    backgroundColor:disable && "var(--input-disable)",
                    border:error && "1px solid red" || disable && "1px solid var(--border)",
                    cursor:disable && "default"
                }} 
                ref={inputRef}
                value={value} 
                disabled={disable}
                defaultValue={defaultValue}
                onKeyDown={onTyping}
                onChange={onChanged}
            />
            <label>{label}</label>
        </WidgetsInfo>
    )
}