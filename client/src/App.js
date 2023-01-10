import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  registerServiceWorker,
  subscribeNotification,
} from './utils/serviceWorker';

import Login from './pages/Login';
import Live from './pages/Live';
import Playback from './pages/Playback';
import Event from './pages/Event';

import './styles/App.css';

function App() {
  useEffect(() => {
    (async () => {
      await registerServiceWorker();

      if ((await Notification.requestPermission()) !== 'granted') {
        alert('Please allow notification');
      }
      await subscribeNotification();
    })();
  }, []);

  return (
    <Router>
      <Switch>
        {/* <Route exact path='/' component={Home} /> */}
        <Route path='/login' component={Login} />
        <Route path='/live' component={Live} />
        <Route path='/playback' component={Playback} />
        <Route path='/event' component={Event} />
        <Route path='*' component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
