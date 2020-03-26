import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

class Notifications extends Component {
    state = {
        anchorEl: null,
    }

    handleOpen = (e) => {
        this.setState({ anchorEl: e.target });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    onMenuOpened = () => {
        
        let unreadNotificationsIds = this.props.notifications
        .filter(notification => !notification.read)
        .map(notification => notification.notificationId);
        
        this.props.markNotificationsRead(unreadNotificationsIds);
    }
    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationIcon;
        
        if (notifications && notifications.length > 0) {
            let unreadNotifications = notifications.filter(not => not.read === false).length;
            unreadNotifications > 0
                ? (notificationIcon = (
                    <Badge badgeContent={unreadNotifications} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                ))
                : (
                    notificationIcon = <NotificationsIcon />
                )
        }
        else {
            notificationIcon = <NotificationsIcon />
        }
        
        

        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map(notification => {
                    const verb = notification.type === 'like' ? 'liked' : 'commented-on';
                    const time = dayjs(notification.createdAt).fromNow();
                    const iconColor = notification.read ? 'primary' : 'secondary';
                    const icon = notification.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                    ) : (
                            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                        )
                    return (
                        <MenuItem key={notification.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography
                                component={Link}
                                color="primary"
                                variant="body1"
                                to={`/users/${notification.recipient}/scream/${notification.screamId}`}
                            >
                                {notification.sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                    <MenuItem onClick={this.handleClose} >
                        You have no notification yet
                    </MenuItem>
                )


        return (
            <Fragment>
                <Tooltip title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEnter={this.onMenuOpened}>
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )

    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications,
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);