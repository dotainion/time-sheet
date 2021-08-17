import { collection } from "../../config/databaseConfig";
import { addData } from "../CollectionRef";

export const addCoords = async(coords) =>{
    try{
        await addData(collection.geolocation, coords);
    }catch(error){
        console.log(error);
        return false;
    }
}