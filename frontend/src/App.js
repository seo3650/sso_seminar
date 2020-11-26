import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import button from './button';

import LoginRedirect from './pages/LoginRedirect';
import LoginCallback from './pages/LoginCallback';

function App() {
  return (
    <Router>
      <Route path = "/" exact component = { button }/>
      <Route path = "/login/redirect" component = { LoginRedirect }/>
      <Route path = "/login/callback" component = { LoginCallback }/>
    </Router>

  );
}

export default App;
