import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(result => {
            setAuthorizationHeader(result.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispacth) => {
    dispacth({ type: LOADING_USER });
    console.log("getting user data");

    axios.get('/user')
        .then(response => {
            dispacth({
                type: SET_USER,
                payload: response.data
            });
        })
        .catch(error => {
            console.log("getting user data, eror");
            console.error(error);
        });
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
        .then(result => {
            setAuthorizationHeader(result.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        });
}



function setAuthorizationHeader(token) {
    const FBIToken = `Bearer ${token}`;

    localStorage.setItem('FBToken', FBIToken);
    axios.defaults.headers.common['Authorization'] = FBIToken;
}

export const uploadImage = (formData) => (dispacth) => {
    dispacth({ type: LOADING_USER });
    axios.post('user/image', formData)
        .then(response => {
            dispacth(getUserData());
        })
        .catch(error => {
            console.error(error);
        });
}