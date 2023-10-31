import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actionType'


export const loginRequest = payload => {
    return {
        type: LOGIN_REQUEST,
        payload: payload
    }
}


export const loginSuccess = payload => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

export const loginFailure = payload => {
    return {
        type: LOGIN_FAILURE,
        payload: payload
    }
}

export const userLogin = (body) => async dispatch => {
    dispatch(loginRequest())
    axios
        .post(`https://dummyjson.com/auth/login`, body)
        .then((response) => {
            dispatch(loginSuccess(response.data));
            localStorage.setItem('token', response.data.token);
        })
        .catch((error) => {
            dispatch(loginFailure(error.data));
        });
}
