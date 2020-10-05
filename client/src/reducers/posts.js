import { GET_POSTS, GET_POSTS_FAILURE, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST,CLEAR_POST, ADD_COMMENT, DELETE_COMMENT } from "../actions/types";

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
        case UPDATE_LIKES : {
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload.postId ? {...post, likes: action.payload.likes} : post),
                isLoading: false
            }
        }
        case DELETE_POST : {
            return {
                ...state,
                posts: state.posts.filter(post =>post._id !== action.payload.postId),
                isLoading: false
            }
        }
        case ADD_POST : {
            return {
                ...state,
                posts: [...state.posts , action.payload],
                isLoading: false
            }
        }
        case GET_POST : {
            return {
                ...state,
                post: action.payload,
                isLoading: false

            }
        }
        case ADD_COMMENT : {
            return {
                ...state,
                post: action.payload,
                isLoading: true
            }
        }
        case DELETE_COMMENT: {
            return {
                ...state,
                post: action.payload,
                isLoading: true
            }
        }
        case CLEAR_POST : {
            return {
                ...state,
                post: null
            }
        }
        
        default:
            return state
    }
}
