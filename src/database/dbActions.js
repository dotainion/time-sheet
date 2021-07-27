import { tools } from "../tools/Tools";
import { addData, getData, getDataByField, getDataById, getRangeFromTo, updateDataByField } from "./dbObjectRef"

const collection = {
    user: "user",
    logs: "logs"
}

export const getLogs = async(id, limit=false) =>{
    try{
        return await getDataByField(collection.logs, "id", id, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getLogsById = async(id) =>{
    try{
        return await getDataByField(collection.logs, "id", id);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getLogsRange = async(from, to, id) =>{
    try{
        let results = await getDataByField(collection.logs, "id", id);// await getRangeFromTo(collection.logs, "start", from, "id", id);
        return results.filter((result)=>tools.time.includes(from, to, result?.info?.start));
    }catch(error){
        console.log(error);
        return [];
    }
}

export const addUser = async(newUser, id) =>{
    try{
        await addData(collection.user, newUser, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getUser = async(id) =>{
    try{
        return await getDataById(collection.user, id);
    }catch(error){
        console.log(error);
        return {};
    }
}

export const getUsers = async(limit=false) =>{
    try{
        return await getData(collection.user,limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const addStartLog = async(data) =>{
    try{
        await addData(collection.logs, data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const addEndLog = async(data, id) =>{
    try{
        return await updateDataByField(collection.logs, data, "end", "none", "id", id);
    }catch(error){
        console.log(error);
        return false;
    }
}
