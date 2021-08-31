import { adminRoutes, routes } from "../utils/routes/Routes";
import { ADMINISTRATOR, SUPERVISOR } from "./AuthValue";
import { ImUserPlus } from 'react-icons/im';
import { FaUsers } from 'react-icons/fa';
import { CgTimelapse } from 'react-icons/cg';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoIosNotifications } from 'react-icons/io';
import { RiSettings5Fill } from 'react-icons/ri';
import { AiFillSchedule } from 'react-icons/ai';
import { BsFillClockFill } from 'react-icons/bs';

export const ADMIN_SIDE_NAV = [
    { 
        title: "ADD USERS",
        route: adminRoutes.addUser,
        icon: ImUserPlus
    },{
        title: "VIEW USERS",
        route: adminRoutes.users,
        icon: FaUsers
    },{
        title: "VIEW LOGS",
        route: adminRoutes.logs,
        icon: CgTimelapse
    },{
        title: "CHAT",
        route: adminRoutes.adminMessages,
        icon: BsFillChatDotsFill
    },{
        title: "NOTIFICATION",
        route: adminRoutes.notification,
        icon: IoIosNotifications
    },{
        title: "SETTINGS",
        route: adminRoutes.settings,
        icon: RiSettings5Fill
    }
];

export const USER_SIDE_NAV = [
    {
        title: "CLOCK IN/OUT",
        route: routes.clocked,
        icon: BsFillClockFill
    },{
        title: "VIEW LOGS",
        route: routes.logs,
        icon: CgTimelapse
    },{
        title: "TIME SHEET",
        route: routes.timeSheet,
        icon: AiFillSchedule
    },{
        title: "CHAT",
        route: routes.messages,
        icon: BsFillChatDotsFill
    },{
        title: "NOTIFICATION",
        route: routes.notification,
        icon: IoIosNotifications
    },{
        title: "SETTINGS",
        route: routes.settings,
        icon: RiSettings5Fill
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
    ADMINISTRATOR,
    SUPERVISOR,
    "Employee",
];
