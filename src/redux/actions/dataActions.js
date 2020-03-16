import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from '../types';
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
            console.log(result.data);

            dispatch({
                type: UNLIKE_SCREAM,
                payload: result.data,
            });
        })
        .catch(error => console.error(error))
}