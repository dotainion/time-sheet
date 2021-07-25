import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './theme/general.css';
import './theme/index.css';
import './theme/responsive.css';
import { Logs } from './pages/Logs';
import { Clocked } from './pages/Clocked';
import { AuthContext } from './auth/Authentication';
import { Authenticate } from './Authenticate';
import { routes } from './routes/Routes';
import { SignIn } from './signIn/SignIn';
import { Administrator } from "./admin/Administrator";
import { Settings } from "./settings/Settings";


function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Switch>
          <Route exact path={routes.default} render={()=><Redirect to={routes.clocked}/>}/>
          <Route exact path={routes.clocked} render={()=><Authenticate Component={Clocked}/>}/>
          <Route exact path={routes.admin} render={()=><Authenticate Component={Administrator}/>}/>
          <Route exact path={routes.settings} render={()=><Authenticate Component={Settings}/>}/>
          <Route exact path={routes.logs} render={()=><Logs/>}/>
          <Route exact path={routes.signIn} render={()=><SignIn/>}/>
        </Switch>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
