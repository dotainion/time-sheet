import React from 'react';
import { AdminNavBar } from '../../../container/AdminNavBar';
import { ContentsWrapper } from '../../../container/ContentsWrapper';
import { BreadCrumbs } from '../../widgets/BreadCrumbs';


export const AdvancePasswordReset = () =>{
    return(
        <AdminNavBar>
            <ContentsWrapper isOpen style={{paddingTop:"50px"}}>
                <BreadCrumbs advanceReset />
            </ContentsWrapper>
        </AdminNavBar>
    )
}