import writeXlsxFile from 'write-excel-file';
import { tools } from '../utils/tools/Tools';


const fileBuilder = (data) =>{
  let objData = [[]];
  objData.push([
    {type:String, fontWeight:"bold", value:"Start Date", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"Start Time", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"End Date", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"End Time", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"Total Time", backgroundColor:"#808080"}
  ]);
  for (let obj of data){
    objData.push(
      [
        {type:String, value:`${tools.time.date(obj?.startTime)}`},
        {type:String, value:`${tools.time.time(obj?.startTime)}`},
        {type:String, value:`${tools.time.date(obj?.endTime)}`},
        {type:String, value:`${tools.time.time(obj?.endTime)}`},
        {type:String, value:`${""}`}
      ]
    );
  }
  return objData;
}

const userBuilder = (user) =>{
  return [
    [
      {type:String, fontWeight:"bold", value:"User ID", backgroundColor:"#808080"},
      {type:String, fontWeight:"bold", value:"Email", backgroundColor:"#808080"},
      {type:String, fontWeight:"bold", value:"Role", backgroundColor:"#808080"},
      {type:String, fontWeight:"bold", value:"FirstName", backgroundColor:"#808080"},
      {type:String, fontWeight:"bold", value:"LastName", backgroundColor:"#808080"}
    ],[
      {type:String, value:user?.id},
      {type:String, value:user?.email},
      {type:String, value: user?.role},
      {type:String, value: user?.firstName},
      {type:String, value: user?.lastName}
    ]
  ];
}

const columnStyle = [
  {width:15},
  {width:15},
  {width:15},
  {width:15},
  {width:15}
]

/**
 * @param {[{startTime:date number, endTime:date number}]} fileName 
 * @param {[{startTime:date number, endTime:date number}]} data 
 * @param {{id:String, role:String, email:String, firstName:String, lastName:String}} user 
 */
export const downloadXlFile = async(data, user, fileName="untitled") =>{
  await writeXlsxFile(
    [
      ...userBuilder(user),
      ...fileBuilder(data)
    ], {
      columns:columnStyle,
      fileName: `${fileName}.xlsx`
    }
  );
}