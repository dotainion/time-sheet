import { BrowserRouter, Switch, Route, Redirect, HashRouter } from "react-router-dom";
import './theme/general.css';
import './theme/index.css';
import './theme/responsive.css';
import './theme/animate.css';
import { Logs } from './members/pages/Logs';
import { Clocked } from './members/pages/Clocked';
import { AuthContext } from '././state/auth/Authentication';
import { Authenticate } from './Authenticate';
import { adminRoutes, routes } from '././utils/routes/Routes';
import { SignIn } from '././public/entryPoint/signIn/SignIn';
import { Settings } from "./members/settings/Settings";
import { StateMangement } from "./state/stateManagement/stateManagement";
import { TimeSheet } from "./members/pages/TimeSheet";
import { AddUser } from "././private/admin/pages/AddUser";
import { Welcome } from "././public/welcome/Welcome";
import { AdminSettings } from "./private/admin/settings/AdminSettings";
import { Users } from "././private/admin/pages/Users";
import { AdminLogs } from "././private/admin/pages/AdminLogs";
import { Page404 } from "./public/404Error/404Errror";
import { Register } from "././public/entryPoint/register/Register";
import { ErrorHandler } from "././state/errors/Error";
import { GeoLocatation } from "./state/geoLocation/GeoLocation";
import { SimpleMap } from "./state/geoLocation/Maps";
import { Pricing } from "./public/pricing/Pricing";
import { AdminProfile } from "./private/admin/settings/AdminProfile";
import { UsersProfile } from "./private/admin/settings/UsersProfile";
import { AdvancePasswordReset } from "./private/admin/settings/AdvancePasswordReset";
import { UpdateUserEmail } from "./private/admin/settings/UpdateUserEmail";
import { UpdateEmail } from "./private/admin/settings/UpdateEmail";
import { AdminMessages } from "./private/admin/pages/AdminMessages";
import { UserMessages } from "./members/pages/Messages";
import { Notifications } from "./members/pages/Notifications";
import { AdminNotifications } from "./private/admin/pages/Notifications";
import { Test } from "./test/Test";
import { Schedules } from "./private/admin/pages/Schedules";
import { Grid } from './grid/Grid';
import { ResetPassword } from "./public/entryPoint/resetPassword/ResetPassword";
import { Help } from "./help/Help";


function App() {
  return (
    <HashRouter>
      <AuthContext>
        <StateMangement>
          <GeoLocatation>
            <ErrorHandler>
              <Switch>
                <Route exact path="/tests" render={()=><Test/>}/>
                <Route exact path={routes.help} render={()=><Help/>}/>
                <Route exact path={routes.signIn} render={()=><SignIn/>}/>
                <Route exact path={routes.pricing} render={()=><Pricing/>}/>
                <Route exact path={routes.register} render={()=><Register/>}/>
                <Route exact path={routes.resetPassword} render={()=><ResetPassword/>}/>
                {/******************************************************************************/}
                <Route exact path={routes.defaultNone} render={()=><Redirect to={routes.default} />}/>
                {/******************************************************************************/}
                <Route exact path={adminRoutes.grid} render={()=><Authenticate Component={Grid}/>}/>
                <Route exact path={adminRoutes.schedule} render={()=><Authenticate Component={Schedules}/>}/>
                <Route exact path={adminRoutes.notification} render={()=><Authenticate Component={AdminNotifications}/>}/>
                <Route exact path={adminRoutes.adminMessages} render={()=><Authenticate Component={AdminMessages}/>}/>
                <Route exact path={adminRoutes.updateEmail} render={()=><Authenticate Component={UpdateEmail}/>}/>
                <Route exact path={adminRoutes.updateUserEmail} render={()=><Authenticate Component={UpdateUserEmail}/>}/>
                <Route exact path={adminRoutes.advanceReset} render={()=><Authenticate Component={AdvancePasswordReset}/>}/>
                <Route exact path={adminRoutes.profile} render={()=><Authenticate Component={AdminProfile}/>}/>
                <Route exact path={adminRoutes.usersProfile} render={()=><Authenticate Component={UsersProfile}/>}/>
                <Route exact path={adminRoutes.logs} render={()=><Authenticate Component={AdminLogs}/>}/>
                <Route exact path={adminRoutes.users} render={()=><Authenticate Component={Users}/>}/>
                <Route exact path={adminRoutes.settings} render={()=><Authenticate Component={AdminSettings}/>}/>
                <Route exact path={adminRoutes.welcome} render={()=><Authenticate Component={Welcome}/>}/>
                <Route exact path={adminRoutes.addUser} render={()=><Authenticate Component={AddUser}/>}/>
                {/******************************************************************************/}
                <Route exact path={routes.grid} render={()=><Authenticate Component={Grid}/>}/>
                <Route exact path={routes.notification} render={()=><Authenticate Component={Notifications}/>}/>
                <Route exact path={routes.messages} render={()=><Authenticate Component={UserMessages}/>}/>
                <Route exact path={routes.default} render={()=><Authenticate Component={Welcome}/>}/>
                <Route exact path={routes.clocked} render={()=><Authenticate Component={Clocked}/>}/>
                <Route exact path={routes.settings} render={()=><Authenticate Component={Settings}/>}/>
                <Route exact path={routes.timeSheet} render={()=><Authenticate Component={TimeSheet}/>}/>
                <Route exact path={routes.logs} render={()=><Authenticate Component={Logs}/>}/>
                {/******************************************************************************/}
                <Route render={()=><Page404/>}/>
              </Switch>
            </ErrorHandler>
          </GeoLocatation>
        </StateMangement>
      </AuthContext>
    </HashRouter>
  );
}

export default App;
