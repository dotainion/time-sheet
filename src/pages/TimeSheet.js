import React from 'react';
import { ContentsWrapper } from '../container/ContentsWrapper';
import { UserNavBar } from '../container/UserNavBar';


export const TimeSheet = () =>{

    return(
        <UserNavBar>
            <ContentsWrapper isOpen>
                hello time sheet
            </ContentsWrapper>
        </UserNavBar>
    )
}