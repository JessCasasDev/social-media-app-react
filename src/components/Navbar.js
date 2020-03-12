import React, { Component } from 'react';
import { Link } from 'react-router-dom/';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" to="/" component={Link}>
                        Home
                    </Button>
                    <Button color="inherit" to="/login" component={Link}>
                        Login
                    </Button>

                    <Button color="inherit" to="/signup" component={Link}>
                        Signup
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }

}

export default NavBar;
