import React, { useEffect, useRef, useState } from 'react';
import { InputEntry } from '../components/widgets/InputEntry';
import { ContentsWrapper } from '../container/ContentsWrapper';
import { addData } from '../database/CollectionRef';


export const add_data = async(data) =>{
    try{
        return await addData("test", data);
    }catch(error){
        console.log(error);
        return false;
    }
}

export const Tests = () =>{
    let before = new Date();
    
    return(
        <ContentsWrapper isOpen>
            <div className="float-center">
                <button onClick={()=>{add_data(before.toString())}} >Locate</button>
                <div></div>
            </div>
        </ContentsWrapper>
    )
}