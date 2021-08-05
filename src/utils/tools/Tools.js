import { MONTHS, WEEK } from "../../contents/lists";

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
            const aDate = new Date(a?.info?.start);
            const bDate = new Date(b?.info?.start);
            return aDate - bDate;
        });
        return array;
    }
    includes(from, to, date){
        if (
            new Date(date).getDate() >= new Date(from).getDate() &&
            new Date(date).getDate() <= new Date(to).getDate() &&
            new Date(date).getFullYear() >= new Date(from).getFullYear() &&
            new Date(date).getFullYear() <= new Date(to).getFullYear() &&
            new Date(date).getMonth() >= new Date(from).getMonth() &&
            new Date(date).getMonth() <= new Date(to).getMonth()
            ) return true;
        return false;
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
}

export const tools = new Tools();