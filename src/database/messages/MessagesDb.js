import React from 'react';
import { collection } from '../../config/databaseConfig';
import { tools } from '../../utils/tools/Tools';
import { addData, getDataByDoubleField, getDataByField, observer } from '../CollectionRef';


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

export const getMessages = async(from, to, limit=false) =>{
    try{
        let ids = [];
        let obj = [];
        const res = await getDataByDoubleField(collection.messages, "from", from, "to", to, limit);
        const res2 = await getDataByDoubleField(collection.messages, "from", to, "to", from, limit);
        console.log(res);
        console.log(res2);
        for(let j of res){
            if (!ids.includes(j?.id)){
                ids.push(j?.id);
                obj.push(j);
            }
        }
        for(let t of res2){
            if (!ids.includes(t?.id)){
                ids.push(t?.id);
                obj.push(t);
            }
        }
        return tools.time.sort(obj);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const messageObserver = (bindId, callBack) =>{
    observer(collection.messages, "bindId", bindId, (obj)=>{
        callBack?.(obj);
    });
}