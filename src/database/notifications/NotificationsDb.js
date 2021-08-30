import { collection } from "../../config/databaseConfig";
import { addData, getDataByField } from "../CollectionRef";


export const addNotification = async(data) =>{
    try{
        await addData(collection.notification, data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getNotification = async(id) =>{
    try{
        return await getDataByField(collection.notification, "id", id);
    }catch(error){
        console.log(error);
        return [];
    }
}