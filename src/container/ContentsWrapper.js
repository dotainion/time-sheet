import React from 'react';

export const ContentsWrapper = ({isOpen, noScroll, maxWith, style, children}) =>{
    return(
        <div hidden={!isOpen} className="page-wrapper-outter-container centered">
            <div className={`page-wrapper-container scrollbar ${maxWith && "max-width"}`} style={{height:noScroll && "auto",...style}}>
                {children}
            </div>
        </div>
    )
}