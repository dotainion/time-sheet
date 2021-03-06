import { collection } from "../../config/databaseConfig";
import { addData, getDataByField, updateData } from "../CollectionRef";


export const addNotification = async(data) =>{
    try{
        await addData(collection.notification, data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const updateNotification = async(data, id) =>{
    try{
        await updateData(collection.notification, data, id);
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

export const getNotificationByAuthId = async(id) =>{
    try{
        return await getDataByField(collection.notification, "adminId", id);
    }catch(error){
        console.log(error);
        return [];
    }
}