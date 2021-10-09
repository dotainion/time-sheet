import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { WidgetsInfo } from './WidgetsInfo';


export const SearchBar = ({searchRef, info, onTyping, cssClass, parentStyle, style, placeholder, error, clearError}) =>{
    const onKeyPress = (e=null) =>{
        onTyping?.(e?.key);
    }

    useEffect(()=>{
        onKeyPress();
    }, []);

    return(
        <WidgetsInfo info={info || "Search bar"} style={parentStyle} error={error}>
                <input
                    ref={searchRef}
                    className={`search-input ${cssClass}`}
                    onKeyUp={onKeyPress}
                    placeholder={placeholder || "Search or start new chat"}
                    onChange={()=>clearError?.("")}
                    style={{
                        border:error && "1px solid red",
                        ...style
                    }}
                    type="search"
                />
        </WidgetsInfo>
    )
}