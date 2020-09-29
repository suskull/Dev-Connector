import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILE_FAILURE, UPDATE_PROFILE,UPDATE_PROFILE_FAILURE, GET_PROFILES, GET_PROFILES_FAILURE } from "../actions/types";


const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    isLoading: true,
    error: {}
}

export default function(state=initialState, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                isLoading: false
            }
        case UPDATE_PROFILE_FAILURE:
        case GET_PROFILE_FAILURE:
        case CLEAR_PROFILE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                profile: null
            }   
        case GET_PROFILES: 
            return {
                ...state,
                profiles: action.payload,
                isLoading: false,
            }     
        case GET_PROFILES_FAILURE: 
            return {
                ...state,
                profiles: null,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}