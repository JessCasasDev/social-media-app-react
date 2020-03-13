import React, { Component } from 'react';
import PropTypes from 'prop-types';
import icon from '../assets/images/icon.png'
import axios from 'axios';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
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
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10,
    },
    progress: {
    }
};

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: []
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(result => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    loading: false,
                    errors: error.response.data
                });
            });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {
        const { errors, loading } = this.state;
        const { classes } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={icon} alt='icon' className={classes.icon} />
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general &&
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={25} className={classes.progress} /> : 'Login'}
                        </Button>
                        <br />
                        <small>Don't have an account? sign up <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }

}

login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(login);