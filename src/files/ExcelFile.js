import writeXlsxFile from 'write-excel-file';
import { tools } from '../utils/tools/Tools';

const header = {
  user: [
    {type:String, fontWeight:"bold", value:"User ID", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"Email", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"Role", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"FirstName", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"LastName", backgroundColor:"#808080"}
  ],
  date: [
    {type:String, fontWeight:"bold", value:"Start Date", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"Start Time", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"End Date", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"End Time", backgroundColor:"#808080"},
    {type:String, fontWeight:"bold", value:"Total Time", backgroundColor:"#808080"}
  ],
  total: [
    {type:String, value:""},
    {type:String, value:""},
    {type:String, value:""},
    {type:String, value:""},
    {type:String, fontWeight:"bold", value:"Grand Total", backgroundColor:"#808080"}
  ]
}

const dateBuilder = (date1, date2) =>{
  return tools.time.addTimeReturnObj(date1, date2);
}

const fileBuilder = (data) =>{
  let objData = [];
  let eDate = null;
  for (let obj of data){
    if (obj?.id){
      objData.push(header.user);
      objData.push(
        [
          {type:String, value: obj?.id},
          {type:String, value: obj?.email},
          {type:String, value: obj?.role},
          {type:String, value: obj?.firstName},
          {type:String, value: obj?.lastName}
        ]
      );
      objData.push(header.date);
      if (eDate){
        objData.push(header.total);
        objData.push(
          [
            {type:String, value:""},
            {type:String, value:""},
            {type:String, value:""},
            {type:String, value:""},
            {type:String, value:`${eDate.hour}:${eDate.seconds}:${eDate.minutes} ${eDate.en}`}
          ]
        );
        objData.push([]);
      }
    }else{
      const dDate = tools.time.subTimeReturnObj(obj?.endTime, obj?.startTime);
      objData.push(
        [
          {type:String, value:`${tools.time.date(obj?.startTime)}`},
          {type:String, value:`${tools.time.time(obj?.startTime)}`},
          {type:String, value:`${tools.time.date(obj?.endTime)}`},
          {type:String, value:`${tools.time.time(obj?.endTime)}`},
          {type:String, value:`${dDate.hour}:${dDate.seconds}:${dDate.minutes} ${dDate.en}`}
        ]
      );
      eDate = dateBuilder(eDate?.date, dDate.date);
    }
  }
  objData.push(header.total);
  objData.push(
    [
      {type:String, value:""},
      {type:String, value:""},
      {type:String, value:""},
      {type:String, value:""},
      {type:String, value:`${eDate.hour}:${eDate.seconds}:${eDate.minutes} ${eDate.en}`}
    ]
  );
  return objData;
}

const columnStyle = [
  {width:15},
  {width:15},
  {width:15},
  {width:15},
  {width:15}
]

/**
 * @param {[
 *    {fileName:String}
 *    {id:String, role:String, email:String, firstName:String, lastName:String}
 *    {startTime:Date, endTime:Date}
 *    {id:String, role:String, email:String, firstName:String, lastName:String}
 * ]} data
 */
export const downloadXlFile = async(data=[]) =>{
  const fileName = data.shift();
  await writeXlsxFile(
    [
      ...fileBuilder(data)
    ], {
      columns:columnStyle,
      fileName: `${fileName}.xlsx`
    }
  );
}