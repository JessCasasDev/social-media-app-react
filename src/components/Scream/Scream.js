import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeBtn from './LikeBtn';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    img: {
        minWidth: 200,
        objectFit: 'cover',
    },
    content: {
        padding: 25,
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes,
            scream: { userImg, body, createdAt, userHandle, screamId, likeCount, commentCount },
            user: { authenticated, credentials: { handle } }
        } = this.props;

        
        const deleteButton = authenticated && userHandle === handle ?
            (<DeleteScream screamId={screamId} />)
            : null
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImg}
                    title="profile picture"
                    className={classes.img}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`users/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                    >
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography
                        variant="body1"
                    >{body}
                    </Typography>
                    <LikeBtn screamId={screamId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"></ChatIcon>
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} />
                </CardContent>
            </Card>
        )
    }

}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps, {})(withStyles(styles)(Scream));
