import { MONTHS, WEEK, WEEK_ABRIV } from "../../contents/lists";


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


class Tools{
    goLocation = new GoLocation();
    store = new Storage();
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
    isMobile(){
        if (window.innerWidth <= 767) return true;
        return false;
    }
}

export const tools = new Tools();