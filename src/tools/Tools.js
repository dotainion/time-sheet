class Time{
    strObjs = (dateNum) =>{
        const date = new Date(dateNum).toDateString();
        const time = new Date(dateNum).toLocaleTimeString();
        return {date, time};
    }
    time(date){
        if (date) return new Date(date).toLocaleTimeString();
        return new Date().toLocaleTimeString();
    }
    date(date){
        if (date) return new Date(date).toDateString();
        return new Date().toDateString();
    }
    digits(date){
        if (date) return new Date(date).getTime();
        return new Date().getTime();
    }
    day(date){
        if (date) return new Date(date).getDate();
        return new Date().getDate();
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

class Tools{
    time = new Time();
}

export const tools = new Tools();