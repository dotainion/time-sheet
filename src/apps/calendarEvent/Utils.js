
class CalendarUtils{
    year;
    month;
    daysInMonths = [];
    isInMonth(date){
        if (new Date(date).getMonth() === this.month){
            return {value: date, is: true};
        }else{
            return {value: date, is: false};
        }
    }
    getCalendarDays (month, year) {
        //get days in month then use to get dates in month
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let i=0; i<daysInMonth;i++){
            this.daysInMonths.push(this.isInMonth(new Date(year, month, i+1)));
        }
    }
    addDaysFromPrevMonth(){
        //add days from previous month in array element with space available of the week
        //eg month start on thursday then sun to wednesday will be insered as from prev month.
        const weekRev = [7,6,5,4,3,2,1];//gives the remainder of days the month didnt start in.
        const daysOfWeek = 7;
        const firstDayInMonth = new Date(this.daysInMonths[0].value);
        const daysFiller = daysOfWeek - weekRev[firstDayInMonth.getDay()];
        for (let i=0;i<daysFiller;i++){
            let prevMonth = new Date(firstDayInMonth);
            prevMonth.setDate(prevMonth.getDate() - (i+1));
            this.daysInMonths.unshift(this.isInMonth(prevMonth));
        }
    }
    addDaysFromNextMonth(){
        //add days from next month in array element with space available of the week
        //eg month end on thursday then wednesday to saturday will be insered as from next month.
        const daysOfWeek2 = 7;
        const lastDayInMonth = this.daysInMonths[this.daysInMonths.length -1];
        const firstDayInMonth2 = new Date(lastDayInMonth?.value);
        const daysFiller2 = daysOfWeek2 - firstDayInMonth2.getDay() -1;
        for (let i=0;i<daysFiller2;i++){
            let prevMonth2 = new Date(firstDayInMonth2);
            prevMonth2.setDate(prevMonth2.getDate() + (i+1));
            this.daysInMonths.push(this.isInMonth(prevMonth2));
        }
    }
    divideDaysByWeekDays(){
        //devide element in array by 7 to indicate the days of the week.
        let index = 0;
        let weekDivided = [];
        let weekDayDivid = [];
        for (let date of this.daysInMonths){
            index ++;
            weekDivided.push(date);
            if (index === 7){
                index = 0;
                weekDayDivid.push(weekDivided);
                weekDivided = [];
            }
        }
        if (weekDivided.length) weekDayDivid.push(weekDivided);
        this.daysInMonths = weekDayDivid;
    }
    init(month=new Date().getMonth(), year=new Date().getFullYear()){
        this.year = year;
        this.month = month;
        this.daysInMonths = [];
        this.getCalendarDays(month, year);
        this.addDaysFromPrevMonth();
        this.addDaysFromNextMonth();
        this.divideDaysByWeekDays();
        return this;
    }
    get(){
        return this.daysInMonths;
    }
}

export const calendarUtils = new CalendarUtils();