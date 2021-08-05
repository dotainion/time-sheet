import { collection } from "../../config/databaseConfig";
import { addData, getDataById, updateData } from "../CollectionRef";

export const addSettings = async(settings, id) =>{
    try{
        await addData(collection.settings, settings, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getSettings = async(id) =>{
    try{
        return await getDataById(collection.settings, id);
    }catch(error){
        console.log(error);
        return {};
    }
}

export const updateSettings = async(settings, id) =>{
    try{
        await updateData(collection.settings, settings, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}