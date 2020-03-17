import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom/';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

import MyButton from '../util/MyButton';
import PostScream from './PostScream';

class NavBar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream />
                            <MyButton tip="Home">
                                <Link to="/"><HomeIcon /></Link>
                            </MyButton>
                            <MyButton tip="Notifications">
                                <Notifications />
                            </MyButton>
                        </Fragment>
                    ) :
                        (<Fragment>
                            <Button color="inherit" to="/" component={Link}>
                                Home
                            </Button>
                            <Button color="inherit" to="/login" component={Link}>
                                Login
                            </Button>

                            <Button color="inherit" to="/signup" component={Link}>
                                Signup
                            </Button>
                        </Fragment>
                        )
                    }

                </Toolbar>
            </AppBar >
        )
    }

}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, {})(NavBar);
