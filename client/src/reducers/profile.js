import { GET_PROFILE, GET_PROFILE_FAILURE } from "../actions/types";


const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    isLoading: true,
    error: {}
}

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                isLoading: false
            }
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                profile: null
            }    
        default:
            return state;
    }
}