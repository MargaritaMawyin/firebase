import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LoginView from './pages/LoginView';
import dashboardView from './pages/dashboardView';
import editProfileView from './pages/editProfileView';
import SignOutView from './pages/signOutView';
import publicProfileView from './pages/publicProfileView';
import chooseUsernameView from './pages/chooseUsernameView';

setupIonicReact();

const App: React.FC = () => (
  <BrowserRouter>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Home } />
          <Route path="/login" component={LoginView } />
          <Route path="/dashboard" component={dashboardView } />
          <Route path="/dashboard/profile" component={editProfileView } />
          <Route path="/signout" component={SignOutView } />          
          <Route path="/u/:username" component={publicProfileView } />
          <Route path="/choose-username" component={chooseUsernameView } />

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </BrowserRouter>

);

export default App;
