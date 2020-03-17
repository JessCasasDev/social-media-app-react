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

/* Create Scream */
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/scream', newScream)
        .then(result => {
            dispatch({ type: POST_SCREAM, payload: result.data });
            dispatch({ type: CLEAR_ERRORS });
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

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({ type: DELETE_SCREAM, payload: screamId })
        })
        .catch(error => console.error(error)
        )
}