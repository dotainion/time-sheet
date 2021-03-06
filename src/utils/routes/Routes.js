const welcomePage = "/welcome";
const defaults = "/timesheet";
const defaultNone = "/";
const signIn = "/sign-in";
const register = "/register";
const pricing = "/pricing";
const grid = "/grid-navigation";
const resetPassword = '/reset-password';
const help = "/help";

export const adminRoutes = {
    welcome: welcomePage,
    default: defaults,
    defaultNone: defaultNone,
    signIn: signIn,
    register: register,
    pricing: pricing,
    grid: grid,
    resetPassword: resetPassword,
    help: help,
    addUser: "/add-user",
    users: "/users",
    logs: "/admin-logs",
    settingsGrid: "/admin-settings",
    profile: "/admin-users-profile",
    passwordChange: "/admin-password-change",
    updateEmail: "/update-user-email",
    adminMessages: "/admin-messages",
    notification: "/admin-notification",
    schedule: "/asign-schedule",
    requests: "/requests",
}

export const routes = {
    welcome: welcomePage,
    default: defaults,
    defaultNone: defaultNone,
    signIn: signIn,
    register: register,
    pricing: pricing,
    grid: grid,
    help: help,
    resetPassword: resetPassword,
    clocked: "/clockec-in-out",
    logs: "/logs",
    settings: "/settings",
    timeSheet: "/time-sheet",
    messages: "/messages",
    notification: "/notification",
    changeEmail: "/change-email-address",
    changePassword: "/change-password"
}