import {REGISTER_SUCCESS, REGISTER_FAILURE} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: true,
    user: null
}
export default function (state=initialState, action) {
    switch(action.type) {
        case REGISTER_SUCCESS : 
        localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,

            }
        case REGISTER_FAILURE: 
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state
    }
}