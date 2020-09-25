import {
    REGISTER_SUCCESS,
     REGISTER_FAILURE,
     GET_AUTH_USER,
    GET_AUTH_USER_FAILURE, 
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOG_OUT
    } from '../actions/types'

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
        localStorage.removeItem('token')

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false
            }
        case GET_AUTH_USER :
            return {
                ...state,
                user:action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case GET_AUTH_USER_FAILURE: 
        localStorage.removeItem('token')

            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case LOGIN_SUCCESS: 
        localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false
            }

        case LOGIN_FAILURE: 
        localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case LOG_OUT:
        localStorage.removeItem('token')
            return {
                ...state,
                user:null,
                isAuthenticated: false,
                isLoading:false
            }
        default:
            return state
    }
}