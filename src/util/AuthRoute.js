import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated === false
                ? <Redirect to='/' />
                : <Component {...props} />}
    >
    </Route>
)

AuthRoute.propTypes = {
    user: PropTypes.object,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);