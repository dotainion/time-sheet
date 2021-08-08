import React, { useEffect, useRef } from 'react';


export const Entry = ({inputRef, successMsg, errorMsg, startTyping, endTyping, cssClass, style, type, placeholder}) =>{
    const timeoutRef = useRef();
    const timeout2Ref = useRef();

    const onTyping = () =>{
        startTyping?.();

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            endTyping?.();
        }, 500);
    }

    useEffect(()=>{
        if (startTyping || endTyping){
            clearTimeout(timeout2Ref.current);
            timeout2Ref.current = setTimeout(() => {
                startTyping?.();
            }, 5000);
        }
    }, [startTyping, endTyping]);
    return(
        <span className="relative">
            <input
                ref={inputRef} 
                className={`input input-hover ${cssClass}`}
                style={{
                    ...style,
                    border: successMsg && "1px solid greenyellow" || errorMsg && "1px solid red"
                }}
                type={type}
                onChange={onTyping}
                placeholder={placeholder}
            />
            <span className="float-bottom-overflow input-success">{successMsg}</span>
            <span className="float-bottom-overflow input-error">{errorMsg}</span>
        </span>
    )
}