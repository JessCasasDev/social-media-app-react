import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    POST_SCREAM,
    SET_SCREAM,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

//Get all screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams')
        .then(result => {
            dispatch({ type: SET_SCREAMS, payload: result.data })
        })
        .catch(error => {
            console.error(error);
            dispatch({ type: SET_SCREAMS, payload: [] });
        })
}

export const getScream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/scream/${screamId}`)
        .then(result => {
            dispatch({ type: SET_SCREAM, payload: result.data });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(error => {
            console.error(error);
        });
}


/* Create Scream */
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/scream', newScream)
        .then(result => {
            dispatch({ type: POST_SCREAM, payload: result.data });
            dispatch(clearErrors());
        }).catch(error => {
            console.error(error);
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        })
}


/* Like scream */
export const likeScream = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/like`)
        .then(result => {
            dispatch({
                type: LIKE_SCREAM,
                payload: result.data,
            });
        })
        .catch(error => console.error(error))
}


export const unlikeScream = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(result => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: result.data,
            });
        })
        .catch(error => console.error(error))
}

export const submitComment = (screamId, commentData) => (dispatch) => {
    axios.post(`/scream/${screamId}/comment`, commentData)
        .then(result => {
            dispatch({ type: SUBMIT_COMMENT, payload: result.data });
            dispatch(clearErrors());
        })
        .catch(error => {
            console.error(error)
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        })
}

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({ type: DELETE_SCREAM, payload: screamId });
        })
        .catch(error => console.error(error)
        )
}

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userHandle}`)
        .then(result => {
            dispatch({ type: SET_SCREAMS, payload: result.data.screams });
        })
        .catch(error => {
            console.error(error);
            dispatch({ type: SET_SCREAMS, payload: null });
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
