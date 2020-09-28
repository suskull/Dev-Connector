import axios from 'axios'
import { GET_PROFILE, GET_PROFILE_FAILURE } from './types'
import {setAlert} from '../actions/alert'

export const getLoginedUserProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
        
        dispatch({
            type: GET_PROFILE_FAILURE,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
   
}


export const createUserProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config)
        
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        history.push('/dashboard')

        // if(!edit) {
        // }

    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        
        dispatch({
            type: GET_PROFILE_FAILURE,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}



