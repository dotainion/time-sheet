import React from 'react';
import { collection } from '../../config/databaseConfig';
import { addData, getDataByField, observer } from '../CollectionRef';


export const getContacts = async(accessId) =>{
    try{
        return await getDataByField(collection.user, "accessId", accessId);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const addMessage = async(data) =>{
    try{
        await addData(collection.messages, data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const messageObserver = (bindId, callBack) =>{
    observer(collection.messages, "bindId", bindId, (obj)=>{
        callBack?.(obj);
    });
}