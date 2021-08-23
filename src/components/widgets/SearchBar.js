import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';


export const SearchBar = ({searchRef, onTyping, style, placeholder}) =>{
    const [showClose, setShowClose] = useState(false);
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
        <div 
            className="search-input centered no-select"
            style={style}
            >
            <input
                ref={searchRef}
                onKeyUp={onKeyPress}
                placeholder={placeholder || "Search or start new chat"}
            />
            <MdClose
                onClick={onClear}
                className="float-right pad"
                style={{display:!showClose && "none"}}
            />
        </div>
    )
}