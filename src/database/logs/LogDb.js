
import { collection } from "../../config/databaseConfig";
import { tools } from "../../utils/tools/Tools";
import { addData, getDataByDoubleField, getDataByField, updateDataByField } from "../CollectionRef";

export const addEndLog = async(data, id) =>{
    try{
        return await updateDataByField(collection.logs, data, "end", "none", "id", id);
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getInProgressLog = async(id) =>{
    try{
        return await getDataByDoubleField(collection.logs,"end","none", "id", id);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getLogsRange = async(from, to, id) =>{
    try{
        let results = await getDataByField(collection.logs, "id", id);
        return  results.filter((result)=>tools.time.includes(from, to, result?.info?.start));
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
        return await getDataByField(collection.logs, "id",id);
    }catch(error){
        console.log(error);
        return [];
    }
}