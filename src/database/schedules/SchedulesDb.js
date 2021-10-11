import { collection } from "../../config/databaseConfig";
import { addData, getDataById, updateData, updateDataByField } from "../CollectionRef";

export const addSchedule = async(data, id) =>{
    try{
        return await addData(collection.schedule, data, id);
    }catch(error){
        console.log(error);
        return false;
    }
}

export const updateSchedule = async(data, id) =>{
    try{
        await updateData(collection.schedule, data, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getSchedule = async(id) =>{
    try{
        return await getDataById(collection.schedule,id);
    }catch(error){
        console.log(error);
        return [];
    }
}
