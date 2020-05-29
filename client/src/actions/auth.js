import axios from 'axios'
import { setAlert } from './alert'
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'

// check token and load user
export const loadUser = () => async (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING })

    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    await axios.get('/api/users', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// signup
export const signup = ({ name, email, password }) => async dispatch => {
    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const body = JSON.stringify({ name, email, password })

    await axios.post('/api/users/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }) )
        .catch(err => {
            dispatch(setAlert(err.response.data))
            dispatch({
                type: REGISTER_FAIL
            })
        })
} 

// login
export const login = ({ email, password }) => async dispatch => {
    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const body = JSON.stringify({ email, password })
    await axios.post('/api/users/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }) )
        .catch(err => {
            dispatch(setAlert(err.response.data))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// logout
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}