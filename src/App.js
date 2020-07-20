import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import MachineProvider from './context/MachineProvider';


function App() {
  return (
    <MachineProvider>
      <Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/profile" component={Profile}/>
        </Switch>
      </Router>
    </MachineProvider>
  );
}

export default App;
