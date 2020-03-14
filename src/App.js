import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import jwtDecode from 'jwt-decode';

import { ThemeProvider as MultiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//Components
import NavBar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

import themeObj from './util/theme';
import axios from 'axios';

const theme = createMuiTheme(themeObj);

const token = localStorage.FBToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < new Date()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Autorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MultiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className="container">
            <NavBar />
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute exact path='/login' component={login} />
              <AuthRoute extac path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MultiThemeProvider>
  );
}

export default App;

