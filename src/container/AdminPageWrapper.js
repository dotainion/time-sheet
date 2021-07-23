import React from 'react';

export const AdminPageWrapper = ({isOpen, noScroll, children}) =>{
    return(
        <div hidden={!isOpen} className="admin-page-outter-container centered">
            <div className="admin-page-container scrollbar" style={{height:noScroll && "auto"}}>
                {children}
            </div>
        </div>
    )
}