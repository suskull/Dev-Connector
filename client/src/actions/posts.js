import axios from 'axios'
import { GET_POSTS, GET_POSTS_FAILURE } from './types'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts/all')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAILURE,
            payload: {msg: error.respsonse.statusText, status: error.respsonse.status}
        })
    }
}