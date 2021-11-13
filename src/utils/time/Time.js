
class Time{
    largerSeconds = 0;
    smallerSeconds = 0;
    PERIODS = ["am", "AM", "pm", "PM"];
    H24 = [13,14,15,16,17,18,19,20,21,22,23,24];
    clear(){
        this.largerSeconds = 0;
        this.smallerSeconds = 0;
    }
    strip(str){
        if (!str) return "";
        this.PERIODS.forEach((en)=>{
            str = str.replace(en, "");
        })
        return str.split(':');
    }
    parse(str){
        if (isNaN(str)) return 0;
        else return parseInt(str);
    }
    sectoSeconds(seconds){
        return this.parse(seconds);
    }
    hourToSeconds(hours){
        return (this.parse(hours) * 60) * 60; //hours to seconds 3600 is 1 hour
    }
    minToSeconds(minutes){
        return this.parse(minutes) * 60;//minutes to seconds
    }
    parse24hours(larger, smaller){
        let [hr, min, sec] = this.strip(larger);
        let [hr2, min2, sec2] = this.strip(smaller);
        if (this.parse(hr) < this.parse(hr2)){
            hr = this.H24[this.parse(hr)-1];
            return [`${hr}:${min}:${sec}`, `${hr2}:${min2}:${sec2}`];
        }
        return [larger, smaller];
    }
    convertToHMS(value){
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours   = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
    }
    process(largerTime, smallerTime){
        const [larger, smaller] = this.parse24hours(largerTime, smallerTime);
        const [hr, min, sec] = this.strip(larger);
        const [hr2, min2, sec2] = this.strip(smaller);
        this.largerSeconds += this.sectoSeconds(sec || 0);
        this.largerSeconds += this.hourToSeconds(hr || 0);
        this.largerSeconds += this.minToSeconds(min || 0);

        this.smallerSeconds += this.sectoSeconds(sec2 || 0);
        this.smallerSeconds += this.hourToSeconds(hr2 || 0);
        this.smallerSeconds += this.minToSeconds(min2 || 0);
    }
    get(cmd){
        let result;
        if (cmd === "add"){
            result = this.convertToHMS(this.largerSeconds + this.smallerSeconds);
        }else if (cmd === "sub"){
            result = this.convertToHMS(this.largerSeconds - this.smallerSeconds);
        }
        this.clear();
        return result;
    }
    add(largerTime, smallerTime, date=false){//"06:00:00"
        if (date){
            largerTime = this.toTimeString(largerTime);
            smallerTime = this.toTimeString(smallerTime);
        }
        this.process(largerTime, smallerTime);
        return this.get("add");
    }
    sub(largerTime, smallerTime, date=false){//"06:00:00"
        if (!largerTime || !smallerTime) return '00:00:00'; 
        if (date){
            largerTime = this.toTimeString(largerTime);
            smallerTime = this.toTimeString(smallerTime);
        }
        this.process(largerTime, smallerTime);
        return this.get("sub");
    }
    isInvalidDate(date){
        if (date === "Invalid Date"){
            return "";
        }
        return date;
    }
    time(date = null){
        if (date !== null){
            return this.isInvalidDate(new Date(date).toLocaleTimeString());
        }
        return new Date().toLocaleTimeString()
    }
    toTimeString(date = null){
        if (date !== null){
            return this.isInvalidDate(new Date(date).toLocaleTimeString());
        }
        return new Date().toLocaleTimeString()
    }
    toDateString(date = null){
        if (date !== null){
            return this.isInvalidDate(new Date(date).toDateString());
        }
        return new Date().toDateString()
    }
    toDigits(date = null){
        if (date !== null){
            return this.isInvalidDate(new Date(date).getTime());
        }
        return new Date().getTime()
    }
    sort(array){
        array.sort(function(a, b){
            const aDate = new Date(a?.info?.start || a?.info?.date || a?.date);
            const bDate = new Date(b?.info?.start || b?.info?.date || b?.date);
            return aDate - bDate;
        });
        return array;
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
}

export const time = new Time();