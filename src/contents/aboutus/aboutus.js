import { FcCalendar} from 'react-icons/fc';
import { FcAddressBook } from 'react-icons/fc';
import { FcMoneyTransfer } from 'react-icons/fc';
import { FcClock } from 'react-icons/fc';
import { FcProcess } from 'react-icons/fc';
import { FcOpenedFolder } from 'react-icons/fc';
import { FcComboChart } from 'react-icons/fc';
import { TiGroup } from 'react-icons/ti';
//import { GrUserAdmin } from 'react-icons/gr';
import { RiAdminLine } from 'react-icons/ri';

export const BENEFITS = [
    {
        title: "Assign roles and administrator privilege for better management.",
        icon: RiAdminLine// GrUserAdmin
    },{
        title: "Track attendance, breaks, and time off with ease.",
        icon: FcAddressBook
    },{
        title: "Control costs with pay rules and schedule integration.",
        icon: FcMoneyTransfer
    },{
        title: "Turn any device into an employee time clock.",
        icon: FcClock
    },{
        title: "Processing payroll can be easier and more reliable.",
        icon: FcProcess
    },{
        title: "No more paper time cards. No expensive hardware. Complete mobile management.",
        icon: FcOpenedFolder
    },{
        title: "Easy attendance management that gives you full control with real-time visibility.",
        icon: FcComboChart
    },{
        title: "Built for teams of any size",
        icon: TiGroup
    },{
        title: "Communicate, schedule, and track attendance all in one place.",
        icon: FcCalendar
    }
];