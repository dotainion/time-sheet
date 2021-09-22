import writeXlsxFile from 'write-excel-file';
import { time } from '../utils/time/Time';


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
  grandTotalLabel = ["","","","","Grand Total"];
  total = null;
  breaks = [];
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
    return [
      {type:String, value: time.toDateString(obj?.startTime)},
      {type:String, value: time.toTimeString(obj?.startTime)},
      {type:String, value: this.addToBreak(obj?.break)},
      {type:String, value: time.toTimeString(obj?.endTime)},
      {type:String, value: this.addToTotal(obj)}
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
    for (let i=0; i<5; i++) temp.push({});
    this.clear();
    return temp;
  }

  addToTotal(obj){
    const result = time.sub(obj?.endTime, obj?.startTime, true);
    if (!this.total) this.total = result;
    else this.total = time.add(this.total, result);
    return result;
  }

  clear(all=null){
    this.total = null;
    this.breaks = [];
    this.colorToggle = !this.colorToggle;
    if (all !== null){
      this.data = [];
    }
  }

  addToBreak(objBreak){
    let sub = "";
    for (let b of objBreak || []){
      if (!sub){
        sub = time.sub(b?.end , b?.start, true);
      }else{
        const dd = time.sub(b?.end , b?.start, true);
        sub = time.add(sub, dd);
      }
    }
    this.breaks.push(sub);
    return sub;
  }

  calcBreaks(){
    let sub = "";
    for (let br of this.breaks){
      if (!sub) sub = br;
      else sub = time.add(sub, br);
    }
    return sub;
  }

  calcGrandTotal(){
    if (!this.breaks.length) return this.total;
    return time.sub(this.total, this.calcBreaks());
  }

  async download(data=[]){
    for (let obj of data){
      if (obj?.id){
        if (this.total !== null){
          this.data.push(this.buildLabel(this.totalBreakLabel));
          this.data.push(this.buildBreakTotal(this.calcBreaks()));
          this.data.push(this.buildLabel(this.totalLabel));
          this.data.push(this.buildTotal(this.total));
          this.data.push(this.buildLabel(this.grandTotalLabel));
          this.data.push(this.buildTotal(this.calcGrandTotal()));
        }
        this.data.push(this.buildSeparator());
        this.data.push(this.buildLabel(this.userLabel));
        this.data.push(this.buildUser(obj));
        this.data.push(this.buildLabel(this.dateLabel));
      }else{
        this.data.push(this.buildDate(obj));
      }
    }
    if (this.total !== null){
      this.data.push(this.buildLabel(this.totalLabel));
      this.data.push(this.buildTotal(this.total))
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
