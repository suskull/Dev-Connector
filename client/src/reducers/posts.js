import { GET_POSTS, GET_POSTS_FAILURE } from "../actions/types";

const initialState= {
    posts: [],
    post: null,
    isLoading: true,
    error: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                isLoading: false
            }
        case GET_POSTS_FAILURE: {
            return {
                ...state,
                erorr:action.payload,
                isLoading: false
            }
        }
        default:
            return state
    }
}
