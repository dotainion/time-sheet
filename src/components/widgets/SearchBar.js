import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { WidgetsInfo } from './WidgetsInfo';


export const SearchBar = ({searchRef, info, onTyping, cssClass, style, placeholder, error, clearError}) =>{
    const [showClose, setShowClose] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const onClear = () =>{
        if (searchRef?.current?.value){
            searchRef.current.value = "";
        }
        onKeyPress();
    }

    const onKeyPress = (e=null) =>{
        onTyping?.(e?.key);
        if (searchRef?.current?.value) setShowClose(true);
        else setShowClose(false);
    }

    useEffect(()=>{
        onKeyPress();
    }, []);

    return(
        <WidgetsInfo info={info || "Search bar"} error={error}>
            <div className={`search-input ${cssClass}`} style={{border:isFocus && "1px solid var(--border-focus)",...style}} >
                <input
                    ref={searchRef}
                    onKeyUp={onKeyPress}
                    onFocus={()=>setIsFocus(true)}
                    onBlur={()=>setIsFocus(false)}
                    placeholder={placeholder || "Search or start new chat"}
                    onChange={()=>clearError?.("")}
                    style={{
                        border:error && "1px solid red"
                    }}
                />
                <MdClose
                    onClick={onClear}
                    className="float-right pad"
                    style={{display:!showClose && "none"}}
                />
            </div>
        </WidgetsInfo>
    )
}