import { collection } from "../../config/databaseConfig";
import { addData, getDataByDoubleField, getDataByField, updateDataByField } from "../CollectionRef";



export const addBreak = async(data) =>{
    try{
        return await addData(collection.break, data);
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getBreak = async(id, limit=false) =>{
    try{
        return await getDataByDoubleField(collection.break, "id", id, "end", "none");
    }catch(error){
        console.log(error);
        return [];
    }
}

export const endBreak = async(data, id) =>{
    try{
        return await updateDataByField(collection.break, data, "end", "none", "id", id);
    }catch(error){
        console.log(error);
        return false;
    }
}
