import {SET_ALERT, REMOVE_ALERT} from './types'
import uuid from 'uuid'
export const removeAlert = id => dispatch => {
    dispatch ({
        type: REMOVE_ALERT,
        payload: id
    })
}
export const setAlert = (msg, alertType) => dispatch => {

    const id = uuid.v4()

    dispatch ({
        type: SET_ALERT,
        payload: {id, msg, alertType},
    })
    // setTimeout(() => {
    //     removeAlert(id)
    // }, 1000);
} 
    
   