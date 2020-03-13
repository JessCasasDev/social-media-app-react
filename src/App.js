import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import jwtDecode from 'jwt-decode';

import { ThemeProvider as MultiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Components
import NavBar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

import themeObj from './util/theme';

const theme = createMuiTheme(themeObj);

const token = localStorage.FBToken;

let authenticated;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < new Date()) {
    window.location.href = '/login';
    authenticated = false;
  }
  else {
    authenticated = true;
  }
}

function App() {
  return (
    <MultiThemeProvider theme={theme}>

      <div className="App">
        <Router>
          <div className="container">
            <NavBar />
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute exact path='/login' component={login} authenticated={authenticated} />
              <AuthRoute extac path='/signup' component={signup} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </div>
    </MultiThemeProvider>
  );
}

export default App;

