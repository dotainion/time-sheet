import { MONTHS, WEEK, WEEK_ABRIV } from "../../contents/lists";


class Time{
    time(date){
        if (date) return new Date(date).toLocaleTimeString();
        return new Date().toLocaleTimeString();
    }
    addHour(date, hour){
        let d = new Date(date);
        d.setHours(hour || 0);
        return this.digits(d);
    }
    date(date){
        if (date) return new Date(date).toDateString();
        return new Date().toDateString();
    }
    year(date){
        if (date) return new Date(date).getFullYear();
        return new Date().getFullYear();
    }
    digits(date){
        if (date) return new Date(date).getTime();
        return new Date().getTime();
    }
    day(date){
        if (date) return new Date(date).getDate();
        return new Date().getDate();
    }
    hour(date){
        if (date) return new Date(date).getHours();
        return new Date().getHours();
    }
    week(date){
        if (date) return new Date(date).getDay();
        return new Date().getDay();
    }
    month(date){
        if (date) return new Date(date).getMonth();
        return new Date().getMonth();
    }
    strObjs = (dateNum) =>{
        return {date:this.date(dateNum), time:this.time()};
    }
    strWeek(date){
        if (date) return WEEK[this.week(date)];
        return WEEK[this.week()];
    }
    strMonth(date){
        if (date) return MONTHS[this.month(date)];
        return MONTHS[this.month()];
    }
    subHour(date1, date2){
        return "-";
    }
    subDays(date1, date2) {
        var t2 = this.digits(date2);
        var t1 = this.digits(date1);
        return parseInt((t2 - t1) / (24 * 3600* 1000));
    }
    subWeeks(date1, date2) {
        var t2 = this.digits(date2);
        var t1 = this.digits(date1);
        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    }
    subMonths(date1, date2) {
        var d1Y = this.year(date1);
        var d2Y = this.year(date2);
        var d1M = this.month(date1);
        var d2M = this.month(date2);
        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    }
    subYears(date1, date2) {
        return this.year(date2) - this.year(date1);
    }
    sort(array){
        array.sort(function(a, b){
            const aDate = new Date(a?.info?.start || a?.info?.date || a?.date);
            const bDate = new Date(b?.info?.start || b?.info?.date || b?.date);
            return aDate - bDate;
        });
        return array;
    }
    sortAccurate(){

    }
    includes(from, to, date){
        if (!from || !to || !date) return false;
        let uTo = new Date(to);
        let uFrom = new Date(from);
        let uDate = new Date(date);
        while (true){            
            if (
                uDate.getDate() === uFrom.getDate() &&
                uDate.getDate() === uFrom.getDate() &&
                uDate.getMonth() === uFrom.getMonth() &&
                uDate.getMonth() === uFrom.getMonth() &&
                uDate.getFullYear() === uFrom.getFullYear() &&
                uDate.getFullYear() === uFrom.getFullYear()
            ){
                return true;
            }

            if (
                uFrom.getDate() === uTo.getDate() &&
                uFrom.getDate() === uTo.getDate() &&
                uFrom.getMonth() === uTo.getMonth() &&
                uFrom.getMonth() === uTo.getMonth() &&
                uFrom.getFullYear() === uTo.getFullYear() &&
                uFrom.getFullYear() === uTo.getFullYear()
            ){
                break;
            }

            uFrom.setDate(uFrom.getDate() + 1);
        }
        return false;
    }
    subTimeReturnObj(date1, date2){
        //more obj keys can be added
        let lDate = new Date(date1);
        let rDate = new Date(date2);
        if (!date1 && !date2){
            lDate = new Date();
        }else if (!date1){
            lDate = new Date(date2);
        }else if (!date2){
            lDate = new Date(date1);
        }else{
            lDate.setMilliseconds(lDate.getMilliseconds() - rDate.getMilliseconds());
            lDate.setSeconds(lDate.getSeconds() - rDate.getSeconds());
            lDate.setMinutes(lDate.getMinutes() - rDate.getMinutes());
            lDate.setHours(lDate.getHours() - rDate.getHours());
        }
        const en = this.time(lDate)?.toLowerCase?.()?.includes?.("am")?"AM":"PM";
        return {
            hour: lDate.getHours(),
            minutes: lDate.getMinutes(),
            seconds: lDate.getSeconds(),
            date: lDate,
            en: en,
            dateString: `${lDate.getHours()}:${lDate.getMinutes()}:${lDate.getSeconds()} ${en}`
        };
    }
    addTimeReturnObj(date1, date2){
        //more obj keys can be added
        let lDate = new Date(date1);
        let rDate = new Date(date2);
        if (!date1 && !date2){
            lDate = new Date();
        }else if (!date1){
            lDate = new Date(date2);
        }else if (!date2){
            lDate = new Date(date1);
        }else{
            lDate.setMilliseconds(lDate.getMilliseconds() + rDate.getMilliseconds());
            lDate.setSeconds(lDate.getSeconds() + rDate.getSeconds());
            lDate.setMinutes(lDate.getMinutes() + rDate.getMinutes());
            lDate.setHours(lDate.getHours() + rDate.getHours());
        }
        const en = this.time(lDate)?.toLowerCase?.()?.includes?.("am")?"AM":"PM";
        return {
            hour: lDate.getHours(),
            minutes: lDate.getMinutes(),
            seconds: lDate.getSeconds(),
            date: lDate,
            en: en,
            dateString: `${lDate.getHours()}:${lDate.getMinutes()}:${lDate.getSeconds()} ${en}`
        };
    }
}

class GoLocation{
    run(){
        navigator.permissions .query({ name: "geolocation" }) .then(function (result) {
            if (result.state === "granted") {
                console.log(result.state);
                //If granted then you can directly call your function here
            } else if (result.state === "prompt") {
                console.log(result.state);
            } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
            }
            result.onchange = function () {
                console.log(result.state);
            };
        });
    }
}

class Storage{
    adminAccess = "admin-access";
    setAuthAccess(email, encriptPassword){
        window.localStorage.setItem(
            this.adminAccess, JSON.stringify({email, password: encriptPassword})
        );
    }
    getAuthAccess(){
        let result = window.localStorage.getItem(this.adminAccess);
        if (result) return JSON.parse(result);
        return null;
    }
    clearAuthAccess(){
        window.localStorage.removeItem(this.adminAccess);
    }
}

class File{
    //xlsx
    download(filename, textInput){
        var element = document.createElement('a');
        const dateType = 'data:text/plain;charset=utf-8, ';
        element.setAttribute('href', dateType + encodeURIComponent(textInput));
        element.setAttribute('download', filename);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

class Tools{
    time = new Time();
    goLocation = new GoLocation();
    store = new Storage();
    file = new File();
    remCharInArr(char, array){
        let tempArr = [];
        for (let elem of array || []){
            tempArr.push(elem.replace(char, ""));
        }
        return tempArr;
    }
    titleCase(string){
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    }
    isEmailValid(email){
        //check if email in valid format
        var validate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (validate.test(email)) return true;
        else return false;
    }
    bindId(from, to, join="~"){
        return [from, to].sort().join(join);
    }
    async toBase64(file){
        try{
            return await new Promise((res, rej) => {
                const reader = new FileReader();
                reader.onload = e => res(e.target.result);
                reader.onerror = e => rej(e);
                reader.readAsDataURL(file); 
            });
        }catch(error){
            console.log(error)
            return null;
        }
    };
    share(name){
        navigator.share({
            title: "Time-sheet",
            text: `${name} invite you to try this application.`,
            url: window.location.origin,
        }).then(()=>{}).catch(()=>{});
    }
    buildScheduleForUi(schedule){
        let holdSched = [];
        const week = schedule?.daysInWeek;
        const month = schedule?.daysInMonth;
        for(let days of week?.length && week || month?.length && month || []){
            holdSched.push({
                startTime: days?.startTime,
                endTime: days?.endTime,
                date: days?.date,
                info: days?.info,
                hours: this.addTimeString(days?.endTime, days?.startTime),
                info: null,
                isActive: days?.isActive
            });
        }
        return holdSched;
    }
    buildScheduleDaysForDb(days){
        let tempArray = [];
        for (let day of days || []){
            if (!WEEK_ABRIV.includes(`${day}`)){
                day = this.time.date(day);
            }
            tempArray.push({
                date: day,
                startTime: null, 
                endTime: null,
                info: null
            });
        }
        return tempArray;
    }
    buildScheduleFromAndToTime(timeObj, from , to){
        //use when user seled from and tim time widget and not indevidual time selector.
        let tempArray = [];
        for (let obj of timeObj || []){
            tempArray.push({
                date: obj?.date,
                startTime: from, 
                endTime: to,
                info: null
            });
        }
        return tempArray;
    }
    stripAmPm(str){
        if (str){
            return str
            .toLowerCase()
            .replace("am", "")
            .replace("pm", "")
        }
        return "";
    }
    addTimeString(date1, date2){
        if (!date1 && !date2) return null;
        if (!date1 && date2) return date2;
        if (date1 && !date2) return date1;
        const [hr, min] = this.stripAmPm(date1).split(":");
        const [hr2, min2] = this.stripAmPm(date2).split(":");
        let hour = parseInt(hr) + parseInt(hr2);
        let minute = parseInt(min) + parseInt(min2);
        let index = 0;
        for (let i=0; i<minute; i++){
            index ++;
            if (index === 60){
                hour ++;
                index = 0;
            }
        }
        minute = index;
        return `${hour}:${minute}`;
    }
    addTimeStringWithSeconds(date1, date2){
        if (!date1 && !date2) return null;
        if (!date1 && date2) return date2;
        if (date1 && !date2) return date1;
        const [hr, min, sec] = this.stripAmPm(date1).split(":");
        const [hr2, min2, sec2] = this.stripAmPm(date2).split(":");
        let hour = parseInt(hr) + parseInt(hr2);
        let minute = parseInt(min) + parseInt(min2);
        let second = parseInt(sec) + parseInt(sec2);
        let index = 0;
        for (let i=0; i<second; i++){
            index ++;
            if (index === 60){
                minute ++;
                index = 0;
            }
        }
        second = index;
        index = 0;
        for (let i=0; i<minute; i++){
            index ++;
            if (index === 60){
                hour ++;
                index = 0;
            }
        }
        minute = index;
        return `${hour}:${minute}:${second}`;
    }
    subTimeString(date1, date2){
        if (!date1 && !date2) return null;
        if (!date1 && date2) return date2;
        if (date1 && !date2) return date1;
        const [hr, min] = this.stripAmPm(date1).split(":");
        const [hr2, min2] = this.stripAmPm(date2).split(":");
        let hour = parseInt(hr) - parseInt(hr2);
        let minute = parseInt(min) - parseInt(min2);
        let index = 0;
        for (let i=0; i<minute; i++){
            index ++;
            if (index === 60){
                hour ++;
                index = 0;
            }
        }
        minute = index;
        return `${hour}:${minute}`;
    }
    subTimeStringWithSeconds(date1, date2){
        if (!date1 && !date2) return null;
        if (!date1 && date2) return date2;
        if (date1 && !date2) return date1;
        const [hr, min, sec] = this.stripAmPm(date1).split(":");
        const [hr2, min2, sec2] = this.stripAmPm(date2).split(":");
        let hour = parseInt(hr) - parseInt(hr2);
        let minute = parseInt(min) - parseInt(min2);
        let second = parseInt(sec) - parseInt(sec2);
        let index = 0;
        for (let i=0; i<second; i++){
            index ++;
            if (index === 60){
                minute ++;
                index = 0;
            }
        }
        second = index;
        index = 0;
        for (let i=0; i<minute; i++){
            index ++;
            if (index === 60){
                hour ++;
                index = 0;
            }
        }
        minute = index;
        return `${hour}:${minute}:${second}`;
    }
    isMobile(){
        if (window.innerWidth <= 767) return true;
        return false;
    }
}

export const tools = new Tools();