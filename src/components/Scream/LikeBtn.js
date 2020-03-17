import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


class LikeBtn extends Component {
    likedScream = () => {
        const { likes } = this.props.user;
        return likes && likes.find(like => like.screamId === this.props.screamId)
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    }

    render() {
        const { authenticated } = this.props.user;

        const likeButton = !authenticated ? (
            <Link to='/login'>
                <MyButton tip="like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>)
            : (this.likedScream() ? (
                <MyButton tip="undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary" />
                </MyButton>)
                : <MyButton tip="like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary" />
                </MyButton>
            )
        return likeButton;
    }
}

LikeBtn.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,

});

const mapActionToProps = {
    likeScream,
    unlikeScream,
}

export default connect(mapStateToProps, mapActionToProps)(LikeBtn);