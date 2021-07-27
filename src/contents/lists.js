import { routes } from "../routes/Routes";

export const adminNavs = [
    { 
        title: "ADD USERS",
    },{
        title: "VIEW USERS",
    },{
        title: "VIEW LOGS",
    },{
        title: "SETTINGS"
    }
];

export const userNavs = [
    {
        title: "CLOCK IN/OUT",
        route: routes.clocked
    },{
        title: "VIEW LOGS",
        route: routes.logs
    },{
        title: "TIME SHEET",
        route: routes.timeSheet
    },{
        title: "SETTINGS",
        route: routes.settings
    }
];

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]