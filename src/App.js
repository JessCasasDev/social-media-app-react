import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { ThemeProvider as MultiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//Components
import NavBar from './components/Navbar';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  formStyle: {
    form: {
      textAlign: 'center',
    },
    icon: {
      maxWidth: 50,
      margin: '20px auto',
    },
    pageTitle: {
      margin: '10px auto',
    },
    textField: {
      margin: '10px auto',
    },
    button: {
      margin: '20px auto',
    },
    customError: {
      color: '#ff0000',
      fontSize: '0.8rem',
      marginTop: 10,
    },
  }
});


function App() {
  return (
    <MultiThemeProvider theme={theme}>

      <div className="App">
        <Router>
          <div className="container">
            <NavBar />
            <Switch>
              <Route exact path='/' component={home} />
              <Route exact path='/login' component={login} />
              <Route extac path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MultiThemeProvider>
  );
}

export default App;

