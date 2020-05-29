import uuid from 'react-uuid'
import { SET_ALERT, REMOVE_ALERT } from './types'

export const setAlert = (msg) => dispatch => {
    const id = uuid()
    dispatch({
        type: SET_ALERT,
        payload: { msg, id }
    })
    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    },5000)
}