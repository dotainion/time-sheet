import { adminRoutes, routes } from "../routes/Routes";

export const ADMIN_SIDE_NAV = [
    { 
        title: "ADD USERS",
        route: adminRoutes.addUser
    },{
        title: "VIEW USERS",
        route: adminRoutes.users
    },{
        title: "VIEW LOGS",
        route: adminRoutes.logs
    },{
        title: "SETTINGS",
        route: adminRoutes.settings
    }
];

export const USER_SIDE_NAV = [
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

export const MONTHS = [
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

export const WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const ROLES = [
    "Administrator",
    "Employer",
    "Supervisor",
    "Employee",
    /*"Constractor",
    "Intern",
    "Other"*/
]