import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { submitComment } from '../../redux/actions/dataActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.formStyle
})

export class CommentForm extends Component {
    state = {
        body: '',
        errors: {},
        loading: false,
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);

        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors, loading: false });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', loading: false, errors: {} });
        }
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.submitComment(this.props.screamId, { body: this.state.body })
    }


    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleOnSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on scream"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleOnChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={this.state.loading}
                    >
                        {this.state.loading ?
                            <CircularProgress size={25} className={classes.progress} />
                            : 'Sumbit!'}
                    </Button>
                </form>
                <hr className={classes.vissibleSeparator} />
            </Grid >
        ) : null;
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated,
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
