import { db } from "../config/AuthConfig";


export const addData = async(collection, data, setUid=null) =>{
    let state = null;
    if(setUid !== null){
        state = await db.collection(collection).doc(setUid).set(data);
    }else{
        const accountRef = db.collection(collection);
        state = await accountRef.add(data);
    }
    return state;
}

export const getDataByField = async(collection,queryKey,queryValue,limit=false) =>{
    let allData = [];
    let accountRef = "";
    if (limit !== false) accountRef = db.collection(collection).where(queryKey,"==",queryValue).limit(limit);
    else accountRef = db.collection(collection).where(queryKey,"==",queryValue);
    let data = await accountRef.get();
    data.forEach((record) => {
        allData.push({ id: record.id, info: record.data() });
    });
    return allData;
}

export const getDataByDoubleField = async(collection,queryKey,queryValue,queryKey2,queryValue2,limit=false) =>{
    let allData = [];
    let accountRef = "";
    if (limit !== false) accountRef = db.collection(collection).where(queryKey,"==",queryValue).where(queryKey2,"==",queryValue2).limit(limit);
    else accountRef = db.collection(collection).where(queryKey,"==",queryValue).where(queryKey2,"==",queryValue2);
    let data = await accountRef.get();
    data.forEach((record) => {
        allData.push({ id: record.id, info: record.data() });
    });
    return allData;
}

export const getDataById = async(collection, uId) =>{
    if(uId){
        const aUser = db.collection(collection).doc(uId);
        return (await aUser.get()).data();
    }
    return null;
}

export const getData = async(collection,limit=false) =>{
    let allData = [];
    let accountRef = "";
    if (!limit) accountRef = db.collection(collection);
    else accountRef = db.collection(collection).limit(limit);
    let data = await accountRef.get();
    data.forEach((record) => {
        allData.push({ id: record.id, info: record.data() });
    });
    return allData;
}

export const updateData = async(collection, data, id) =>{
    if(id){
        const delRef = db.collection(collection).doc(id);
        return await delRef.update(data)
    }
    return null;
}

export const updateDataByField = async(collection, data, queryKey, queryValue, queryKey2=null, queryValue2=null, limit=false) =>{
    const records = await getDataByField(collection, queryKey, queryValue, limit);
    for (let record of records){
        if (queryKey2 && queryKey2){
            if (record?.info[queryKey] === queryValue && record?.info[queryKey2] === queryValue2){
                await updateData(collection, data, record?.id);
            }
        }else{
            if (record?.info[queryKey] === queryValue){
                await updateData(collection, data, record?.id);
            }
        }
    };
    return true;
}

export const getRangeFromTo = async(collection, fromRef, from, idRef, id) =>{
    const resRef = db.collection(collection)
    .where(fromRef,">=",from).where(idRef,"==",id);
    let data = await resRef.get();
    let ranges = [];
    data.forEach((record) => {
        ranges.push({ id: record.id, info: record.data() });
    });
    return ranges;
}

export const observer = (collection, queryKey, queryValue, observe) =>{
    db.collection(collection)
    .where(queryKey, "==", queryValue)
    .onSnapshot((data)=>{
        let ranges = [];
        data.forEach((record) => {
            ranges.push({ id: record.id, info: record.data() });
        });
        observe?.(ranges);
    });
}