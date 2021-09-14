import { adminRoutes, routes } from "../utils/routes/Routes";
import { ADMINISTRATOR, SUPERVISOR } from "./AuthValue";
import { ImUserPlus } from 'react-icons/im';
import { CgTimelapse } from 'react-icons/cg';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoIosNotifications } from 'react-icons/io';
import { AiFillSchedule } from 'react-icons/ai';
import { BsFillClockFill } from 'react-icons/bs';

import { BsGrid3X3Gap } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUsers, FaRegClock } from 'react-icons/fa';
import { VscCalendar } from 'react-icons/vsc';
import { AiFillMessage } from 'react-icons/ai';
import { RiSettings5Fill } from 'react-icons/ri';
import { ImNotification } from 'react-icons/im';
import { HiUserAdd } from 'react-icons/hi';


export const ADMIN_SIDE_NAV = [
    {
        title: "Menu",
        icon: GiHamburgerMenu,
        route: null,
        info: "Expand menu option",
    },{
        title: "Grid",
        icon: BsGrid3X3Gap,
        route: adminRoutes.grid,
        info: "Grid navigation"
    },{
        title: "Add User",
        icon: HiUserAdd,
        route: adminRoutes.addUser,
        info: "Add a new member"
    },{
        title: "Users",
        icon: FaUsers,
        route: adminRoutes.users,
        info: "View all users"
    },{
        title: "Logs",
        icon: FaRegClock,
        route: adminRoutes.logs,
        info: "View users logs"
    },{
        title: "Schedule",
        icon: VscCalendar,
        route: adminRoutes.schedule,
        info: "Schedule a task"
    },{
        title: "Message",
        icon: AiFillMessage,
        route: adminRoutes.adminMessages,
        info: "Send messages"
    },{
        title: "Notification",
        icon: ImNotification,
        route: adminRoutes.notification,
        info: "Assign or view notification"
    },{
        title: "Settings",
        icon: RiSettings5Fill,
        route: adminRoutes.settings,
        info: "Update settigns"
    }
];

export const USER_SIDE_NAV = [
    {
        title: "Menu",
        icon: GiHamburgerMenu,
        info: "Expand menu option"
    },{
        title: "Grid",
        icon: BsGrid3X3Gap,
        route: routes.grid,
        info: "Grid navigation"
    },{
        title: "CLOCK IN/OUT",
        route: routes.clocked,
        icon: BsFillClockFill,
        info: ""
    },{
        title: "VIEW LOGS",
        route: routes.logs,
        icon: CgTimelapse,
        info: ""
    },{
        title: "TIME SHEET",
        route: routes.timeSheet,
        icon: AiFillSchedule,
        info: ""
    },{
        title: "CHAT",
        route: routes.messages,
        icon: BsFillChatDotsFill,
        info: ""
    },{
        title: "NOTIFICATION",
        route: routes.notification,
        icon: IoIosNotifications,
        info: ""
    },{
        title: "SETTINGS",
        route: routes.settings,
        icon: RiSettings5Fill,
        info: ""
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

export const WEEK_ABRIV = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

export const REPEAT = [
    "Never", 
    "On", 
    "After"
];
