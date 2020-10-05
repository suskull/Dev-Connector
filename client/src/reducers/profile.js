import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILURE,
  GET_PROFILES,
  GET_PROFILES_FAILURE,
  GET_PROFILE_BY_ID,
  GET_PROFILE_BY_ID_FAILURE, GET_REPOS, GET_REPOS_FAILURE, LOADING_TRUE,
  CLEAR_PROFILES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    case UPDATE_PROFILE_FAILURE:
    case GET_PROFILE_FAILURE:
    
    case GET_PROFILE_BY_ID_FAILURE:
    
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        profile: null,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        isLoading: false,
      };
    case GET_PROFILES_FAILURE:
      return {
        ...state,
        profiles: null,
        isLoading: false,
        error: action.payload,
      };
    case GET_REPOS :
      return {
        ...state,
        repos: action.payload,
        isLoading: false
      }
    case GET_REPOS_FAILURE: 
      return {
        ...state,
        repos: [],
        isLoading: false
      }
      case CLEAR_PROFILE:
        return {
          ...state,
          repos: [],
          profile: null,
        }
      case LOADING_TRUE: 
      return {
        ...state,
        isLoading: true
      }
      case CLEAR_PROFILES: {
        return {
          ...state,
          profiles: []
        }
      }
    default:
      return state;
  }
}
