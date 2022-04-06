import './App.css';
import { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPages';
import SignUp from './components/views/SignUpPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Channel from './components/views/Channel';
import DirectMessasge from './components/views/DirectMessage';
import Auth from './hoc/auth';
import WorkSpace from './components/layouts/Workspace';

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Fragment>
          <Routes>
            <Route exact path="/" element={Auth(LandingPage, null)}>
            </Route>
            <Route exact path="/login" element={Auth(LoginPage, false)}>
            </Route>
            <Route path="/register" element={Auth(RegisterPage, false)}>
            </Route>
            <Route path="/signup" element={Auth(SignUp, false)}>
            </Route>
            <Route path="/workspace" element={Auth(WorkSpace, true)}>
            </Route>
            <Route path="/workspace/channel" element={Auth(Channel, true)}>
            </Route>
            <Route path="/workspace/dm" element={Auth(DirectMessasge, true)}>
            </Route>
          </Routes>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
