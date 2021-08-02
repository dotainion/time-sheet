import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './theme/general.css';
import './theme/index.css';
import './theme/responsive.css';
import './theme/text.css';
import './theme/animate.css';
import { Logs } from './members/pages/Logs';
import { Clocked } from './members/pages/Clocked';
import { AuthContext } from '././state/auth/Authentication';
import { Authenticate } from './Authenticate';
import { adminRoutes, routes } from '././utils/routes/Routes';
import { SignIn } from '././public/entryPoint/signIn/SignIn';
import { Settings } from "./settings/user/Settings";
import { StateMangement } from "./state/stateManagement/stateManagement";
import { TimeSheet } from "./members/pages/TimeSheet";
import { AddUser } from "././private/admin/pages/AddUser";
import { Welcome } from "././public/welcome/Welcome";
import { AdminSettings } from "./settings/admin/AdminSettings";
import { Users } from "././private/admin/pages/Users";
import { AdminLogs } from "././private/admin/pages/AdminLogs";
import { Page404 } from "./public/404Error/404Errror";
import { Register } from "././public/entryPoint/register/Register";
import { ErrorHandler } from "././state/errors/Error";


function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <StateMangement>
          <ErrorHandler>
            <Switch>
              <Route exact path={routes.signIn} render={()=><SignIn/>}/>
              <Route exact path={routes.register} render={()=><Register/>}/>
              {/******************************************************************************/}
              <Route exact path={adminRoutes.logs} render={()=><Authenticate Component={AdminLogs}/>}/>
              <Route exact path={adminRoutes.users} render={()=><Authenticate Component={Users}/>}/>
              <Route exact path={adminRoutes.settings} render={()=><Authenticate Component={AdminSettings}/>}/>
              <Route exact path={adminRoutes.welcome} render={()=><Authenticate Component={Welcome}/>}/>
              <Route exact path={adminRoutes.addUser} render={()=><Authenticate Component={AddUser}/>}/>
              {/******************************************************************************/}
              <Route exact path={routes.default} render={()=><Authenticate Component={Welcome}/>}/>
              <Route exact path={routes.clocked} render={()=><Authenticate Component={Clocked}/>}/>
              <Route exact path={routes.settings} render={()=><Authenticate Component={Settings}/>}/>
              <Route exact path={routes.timeSheet} render={()=><Authenticate Component={TimeSheet}/>}/>
              <Route exact path={routes.logs} render={()=><Authenticate Component={Logs}/>}/>
              {/******************************************************************************/}
              <Route render={()=><Page404/>}/>
            </Switch>
          </ErrorHandler>
        </StateMangement>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
