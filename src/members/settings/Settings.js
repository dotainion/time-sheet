import React from 'react';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { UserNavBar } from '../../container/UserNavBar';

export const Settings = () =>{
    return(
        <UserNavBar>
            <ContentsWrapper isOpen>
                settigns
            </ContentsWrapper>
        </UserNavBar>
    )
}