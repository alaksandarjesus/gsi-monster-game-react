import React from 'react';
import {useDispatch}  from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Nav } from './components/Nav';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Play } from './pages/Play';
import { hasLoggedIn } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  dispatch(hasLoggedIn());
  return (
   <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
