import React from 'react';

export const ContentsWrapper = ({isOpen, noScroll, children}) =>{
    return(
        <div hidden={!isOpen} className="page-wrapper-outter-container centered">
            <div className="page-wrapper-container scrollbar" style={{height:noScroll && "auto"}}>
                {children}
            </div>
        </div>
    )
}