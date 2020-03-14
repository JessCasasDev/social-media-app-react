import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

class home extends Component {
    state = {
        screams: null
    }
    componentDidMount() {
        axios.get('screams')
            .then(result => {
                this.setState({
                    screams: result.data
                })
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        let recentScreamsMarkup =
            this.state.screams
                ? (this.state.screams.map((scream) => <div key={scream.screamId}><Scream scream={scream} /></div>))
                : <p>Loading...</p>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Profile/>
                </Grid>
            </Grid>
        )
    }
}

export default home;