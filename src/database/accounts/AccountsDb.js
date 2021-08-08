import { collection } from "../../config/databaseConfig";
import { addData, getData, getDataByDoubleField, getDataByField, getDataById, updateData } from "../CollectionRef";

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

export const getUsers = async(accessId, supervisorId, limit=false) =>{
    try{
        const response = await getDataByDoubleField(collection.user,"accessId",accessId,"supervisorId",supervisorId, limit);
        return response.filter((record)=>!record?.id.includes(supervisorId));
    }catch(error){
        console.log(error);
        return [];
    }
}

export const updateUser = async(data, id) =>{
    try{
        await updateData(collection.user, data, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}