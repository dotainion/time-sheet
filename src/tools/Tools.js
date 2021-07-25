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
    sort(array){
        array.sort(function(a, b){
            const aDate = new Date(a?.info?.start);
            const bDate = new Date(b?.info?.start);
            return aDate - bDate;
        });
        return array;
    }
}

class Tools{
    time = new Time();
}

export const tools = new Tools();