import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

class home extends Component {

    componentDidMount() {
        this.props.getScreams();
    }

    render() {
        const { screams, loading } = this.props.data;
        console.log(loading, this.props.data);

        let recentScreamsMarkup =
            !loading ?
                (screams.map((scream) => <div key={scream.screamId}><Scream scream={scream} /></div>))
                : <p>Loading...</p>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getScreams })(home);