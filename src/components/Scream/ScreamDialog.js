import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Comments from './Comments';
import CommentForm from './CommentForm';

import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from '@material-ui/core/Grid';

import LikeBtn from './LikeBtn';
import ChatIcon from '@material-ui/icons/Chat';

import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../../util/MyButton';
import CircularProgress from "@material-ui/core/CircularProgress";

import dayjs from 'dayjs';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.formStyle,
    profileImage: {
        maxWidth: 200,
        height: 200,
        width: 200,
        borderRadius: '50%',
        objectFit: 'cover',
    },
    dialogContent: {
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
    },
    expandBtn: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    content: {
        display: 'block',
    }
});

class ScreamDialog extends Component {
    state = {
        open: false,
    }

    handleOpen = () => {
        this.props.getScream(this.props.screamId);
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();
    }

    render() {
        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImg,
                userHandle,
                comments,
            },
            UI: { loading } } = this.props;

        const dialogMarkup = loading ? <div className={classes.spinnerDiv}><CircularProgress size={200} thickness={2} /> </div> :
            (<Grid container spacing={10}>
                <Grid item sm={5}>
                    <img src={userImg} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                    >
                        @userHandle
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography
                        variant="body2"
                        color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography
                        variant="body1"
                        className={classes.content}>
                        {body}
                    </Typography>
                    <LikeBtn screamId={screamId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"></ChatIcon>
                    </MyButton>
                    <span>{commentCount} comments</span>

                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>)
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="expand scream" tipClassName={classes.expandBtn}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    scream: state.data.singularScream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream,
    clearErrors,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));

