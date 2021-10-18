import { collection } from "../../config/databaseConfig";
import { addData, getDataByDoubleField, getDataByField, updateData } from "../CollectionRef";


export const addRequestChange = async(data) =>{
    try{
        await addData(collection.request, data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getRequestChange = async(id, filter=null) =>{
    try{
        return await getDataByDoubleField(collection.request, "accepted", filter || "none", "supervisorId", id);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const updateRequestChange = async(data, id) =>{
    try{
        return await updateData(collection.request, data, id);
    }catch(error){
        console.log(error);
        return [];
    }
}