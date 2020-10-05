import axios from 'axios'
import { ADD_POST, DELETE_POST, GET_POSTS, GET_POSTS_FAILURE, UPDATE_LIKES, GET_POST, CLEAR_POST, ADD_COMMENT, DELETE_COMMENT  } from './types'
import {setAlert} from './alert'
export const getPosts = () => async dispatch => {
    dispatch({
        type: CLEAR_POST
    })
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

export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAILURE,
            payload: {msg: error?.respsonse?.statusText, status: error?.respsonse?.status}
        })
    }
}

export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAILURE,
            payload: {msg: error?.respsonse?.statusText, status: error?.respsonse?.status}
        })
    }
}

export const deletePost = postId => async dispatch => {
    try {
        const res = await axios.delete(`api/posts/${postId}`)

        dispatch({
            type: DELETE_POST,
            payload: {postId}
        })

        dispatch(setAlert(res.data.msg, 'success'))
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAILURE,
            payload: {msg: error?.respsonse?.statusText, status: error?.respsonse?.status}
        })
    }
}

export const addPost = formData => async dispatch => {
    const config ={
        headers: {
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData, config)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post create success', 'success'))
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAILURE,
            payload: {msg: error?.respsonse?.statusText, status: error?.respsonse?.status}
        })
    }
}

export const getPostById = postId => async dispatch => {

    try {
        const res = await axios.get(`/api/posts/${postId}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAILURE,
            payload: {msg: error?.respsonse?.statusText, status: error?.respsonse?.status}
        })
    }
}

export const addComment = (postId, formData) => async dispatch => {

     const config = {
         headers : {
             'Content-Type': 'application/json'
         }
     }
    try {
        const res = await axios.put(`/api/posts/comment/${postId}`, formData, config)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Create comment success', 'success'))

    } catch (error) {
        dispatch({
            type: GET_POSTS_FAILURE,
            payload: {msg: error?.respsonse?.statusText, status: error?.respsonse?.status}
        })
    }
}


export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type:DELETE_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Delete success', 'success'))

    } catch (error) {
        dispatch({
            type: GET_POSTS_FAILURE,
            payload: {msg: error?.respsonse?.statusText, status: error?.respsonse?.status}
        })
    }
}
