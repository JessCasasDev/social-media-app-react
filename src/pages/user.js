import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/Scream/Scream';
import StaticProfile from '../components/Profile/StaticProfile';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

import { getUserData } from '../redux/actions/dataActions';

export class user extends Component {
    state = {
        profile: null,
    }
    componentDidMount() {
        const handle = this.props.match.params.handle;
        console.log(handle);
        
        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(result => {
                this.setState({ profile: result.data.user })
            })
            .catch(error => console.error(error))
    }

    render() {
        const { screams, loading } = this.props.data;
        const screamsMarkup = loading
            ? <p>Loading data</p>
            : screams === null
                ? <p>No screams from user</p>
                : (screams.map(scream => <Scream key={scream.screamId} scream={scream} />))

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null
                        ? <p>Loading profile </p>
                        : <StaticProfile profile={this.state.profile} />
                    }
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    data: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);

