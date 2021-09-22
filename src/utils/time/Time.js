
class Time{
    largerSeconds = 0;
    smallerSeconds = 0;
    clear(){
        this.largerSeconds = 0;
        this.smallerSeconds = 0;
    }
    strip(str){
        if (!str) return "";
        ["am", "AM", "pm", "PM"].forEach((en)=>{
            str = str.replace(en, "");
        })
        return str;
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
        const [hr, min, sec] = this.strip(largerTime).split(':');
        const [hr2, min2, sec2] = this.strip(smallerTime).split(':');
        this.largerSeconds += this.sectoSeconds(sec);
        this.largerSeconds += this.hourToSeconds(hr);
        this.largerSeconds += this.minToSeconds(min);

        this.smallerSeconds += this.sectoSeconds(sec2);
        this.smallerSeconds += this.hourToSeconds(hr2);
        this.smallerSeconds += this.minToSeconds(min2);
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
        if (date){
            largerTime = this.toTimeString(largerTime);
            smallerTime = this.toTimeString(smallerTime);
        }
        this.process(largerTime, smallerTime);
        return this.get("sub");
    }
    toTimeString(date){
        return new Date(date).toLocaleTimeString();
    }
    toDateString(date){
        return new Date(date).toDateString();
    }
}

export const time = new Time();