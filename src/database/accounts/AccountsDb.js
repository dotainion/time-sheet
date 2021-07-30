import { collection } from "../../config/databaseConfig";
import { addData, getData, getDataById } from "../CollectionRef";

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