import { collection } from "../../config/databaseConfig";
import { addData, getDataById } from "../CollectionRef";

export const addCreds = async(newUser, id) =>{
    try{
        await addData(collection.credentials, newUser, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getCreds = async(id) =>{
    try{
        return await getDataById(collection.credentials,id);
    }catch(error){
        console.log(error);
        return {};
    }
}