import { collection } from "../../config/databaseConfig";
import { addData } from "../CollectionRef";

export const addCreds = async(newUser, id) =>{
    try{
        await addData(collection.credentials, newUser, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}