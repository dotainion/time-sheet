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
        title: "SETTINGS",
        route: routes.settings
    }
];