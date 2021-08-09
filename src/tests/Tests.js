import React, { useRef, useState } from 'react';
import { InputEntry } from '../components/widgets/InputEntry';
import { ContentsWrapper } from '../container/ContentsWrapper';


export const Tests = () =>{
    return(
        <ContentsWrapper isOpen>
            <InputEntry/>
            <InputEntry/>
        </ContentsWrapper>
    )
}