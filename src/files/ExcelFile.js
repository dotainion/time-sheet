import writeXlsxFile from 'write-excel-file';
import { tools } from '../utils/tools/Tools';


const columnStyle = [
  {width:30},
  {width:30},
  {width:20},
  {width:20},
  {width:20}
]

/**
 * @param {[
 *    {fileName:String}
 *    {id:String, role:String, email:String, firstName:String, lastName:String}
 *    {startTime:Date, endTime:Date}
 *    {id:String, role:String, email:String, firstName:String, lastName:String}
 * ]} data
 */
class XlFile{
  data = [];
  fileName = "time-tracker";
  userLabel = ["User ID","Email","Role","FirstName","LastName"];
  dateLabel = ["Date","Start Time","Break","End Time","Total Time"];
  totalLabel = ["","","","","Total Hours"];
  totalBreakLabel = ["","","","","Total Break"];
  grandTotalLabel = ["","","","","Grand Break"];
  date = null;
  breaks = "";
  colorToggle = false;

  buildLabel(arrayObj){
    let temp = [];
    for (let name of arrayObj){
      temp.push({
        type: String,
        fontWeight: "bold",
        value: name,
        backgroundColor: this.colorToggle? "#808080": "#008080"
      });
    }
    return temp;
  }

  buildUser(obj){
    return [
      {type:String, value: obj?.id},
      {type:String, value: obj?.email},
      {type:String, value: obj?.role},
      {type:String, value: obj?.firstName},
      {type:String, value: obj?.lastName}
    ];
  }

  buildDate(obj){
    const [startTime, endTime, total, dDate, dBreak] = this.extract(obj);
    return [
      {type:String, value: dDate},
      {type:String, value: startTime},
      {type:String, value: dBreak},
      {type:String, value: endTime},
      {type:String, value: total}
    ];
  }

  buildTotal(total){
    return [
      {type:String, value: ""},
      {type:String, value: ""},
      {type:String, value: ""},
      {type:String, value: ""},
      {type:String, value: total}
    ]
  }

  buildBreakTotal(total){
    return [
      {type:String, value: ""},
      {type:String, value: ""},
      {type:String, value: ""},
      {type:String, value: ""},
      {type:String, value: total}
    ]
  }

  buildSeparator(){
    let temp = [];
    for (let i=0; i<5; i++){
      temp.push({});
    }
    return temp;
  }

  clear(all=null){
    this.date = null;
    this.breaks = "";
    this.colorToggle = !this.colorToggle;
    if (all !== null){
      this.data = [];
    }
  }

  strip(str){
    return str.replace(/ /g, "")
    .replace("am", "")
    .replace("pm", "")
    .replace("AM", "")
    .replace("PM", "")
  }

  addDate(date){
    if (this.date === null){
      this.date = date;
    }else{
      this.date.setHours(this.date.getHours() + date.getHours());
      this.date.setMinutes(this.date.getMinutes() + date.getMinutes());
      this.date.setSeconds(this.date.getSeconds() + date.getSeconds());
      this.date.setMilliseconds(this.date.getMilliseconds() + date.getMilliseconds());
    }
  }

  extract(timeObj){
    let lDate = new Date(timeObj?.endTime);
    let rDate = new Date(timeObj?.startTime);
    lDate.setHours(lDate.getHours() - rDate.getHours());
    lDate.setMinutes(lDate.getMinutes() - rDate.getMinutes());
    lDate.setSeconds(lDate.getSeconds() - rDate.getSeconds());
    lDate.setMilliseconds(lDate.getMilliseconds() - rDate.getMilliseconds());
    const startTime = this.strip(tools.time.time(timeObj?.startTime));
    const endTime = this.strip(tools.time.time(timeObj?.endTime));
    const total = this.total(lDate);
    this.addDate(lDate);
    return [
      startTime, 
      endTime, 
      total, 
      tools.time.date(timeObj?.startTime),
      this.calcBreak(timeObj?.break)
    ];
  }

  calcBreak(objBreak){
    let dDate = "";
    for (let b of objBreak || []){
      const smallerNum = tools.time.time(b?.start);
      const largerNum = tools.time.time(b?.end);
      if (!dDate){
        dDate = tools.subTimeStringWithSeconds(largerNum, smallerNum);
      }else{
        const dd = tools.subTimeStringWithSeconds(largerNum, smallerNum);
        dDate = tools.addTimeStringWithSeconds(dDate, dd);
      }
    }
    this.breaks = dDate;
    return dDate;
  }

  total(date=null){
    if (date === null){
      date = this.date;
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  totalBreak(){
    return this.breaks;
  }

  subBreakFromTotal(){
    let resultes;
    if (!this.totalBreak()) resultes = this.total();
    resultes = tools.subTimeStringWithSeconds(this.total(), this.totalBreak());
    this.clear();
    return resultes;
  }

  async download(data=[]){
    for (let obj of data){
      if (obj?.id){
        if (this.date !== null){
          this.data.push(this.buildLabel(this.totalBreakLabel));
          this.data.push(this.buildBreakTotal(this.totalBreak()));
          this.data.push(this.buildLabel(this.totalLabel));
          this.data.push(this.buildTotal(this.total()));
          this.data.push(this.buildLabel(this.grandTotalLabel));
          this.data.push(this.buildTotal(this.subBreakFromTotal()));
        }
        this.data.push(this.buildSeparator());
        this.data.push(this.buildLabel(this.userLabel));
        this.data.push(this.buildUser(obj));
        this.data.push(this.buildLabel(this.dateLabel));
      }else{
        this.data.push(this.buildDate(obj));
      }
    }
    if (this.date !== null){
      this.data.push(this.buildLabel(this.totalLabel));
      this.data.push(this.buildTotal(this.total()))
    }
    await writeXlsxFile(
      this.data, 
      {
        columns:columnStyle,
        fileName: `${this.fileName}.xlsx`
      }
    );
    this.clear(true);
  }
}

export const xlFile = new XlFile();
