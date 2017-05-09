import  axios from 'axios';
import {browserHistory} from 'react-router';
import {Settings} from '../../settings';

const handleError = (error) => {
    if (error.response) {
        console.log(error.response.data.error);
    } else {
        console.log(error);
    }
};

export const fetchPosts = () => {
    return dispatch => {
        axios.get(`${Settings.host}/posts`)
            .then(response => {
                dispatch({type: 'LOAD_POSTS', posts: response.data.posts})
            })
            .catch(error => handleError(error))
    }
};

export const newPost = (data) => {
    return dispatch => {
        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('image', data.file);
        axios.post(`${Settings.host}/posts`, formData, {
            headers: {
                'Authorization': sessionStorage.getItem('jwtToken')
            }
        }).then(response => {
            dispatch({type: 'ADD_POST', post: response.data.post});
            browserHistory.push('/dashboard');
            console.log(response.data.message);
        }).catch(error => handleError(error))
    }
};

export const getPost = (post_id) => {
    return dispatch => {
        axios.get(`${Settings.host}/posts/${post_id}`)
            .then(response => {
                dispatch({type: 'LOAD_POST', post: response.data.post});
            })
            .catch(error => handleError(error));
    }
};

export const clearPost = () => {
    return {
        type: 'CLEAR_POST'
    }
};

export const editPost = (data, post_id) => {
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', data.file);
    return dispatch => {
        axios.put(`${Settings.host}/posts/${post_id}`, formData, {
            headers: {'Authorization': sessionStorage.getItem('jwtToken')}
        }).then(response => {
            dispatch({type: 'EDIT_POST', post: response.data.post});
            browserHistory.push('/dashboard');
            console.log(response.data.message);
        }).catch(error => handleError(error))
    }
};

export const deletePost = (post_id) => {
    return dispatch => {
        axios.delete(`${Settings.host}/posts/${post_id}`, {
            headers: {'Authorization': sessionStorage.getItem('jwtToken')}
        }).then(response => {
            dispatch({type: 'DELETE_POST', id: response.data.post_id});
            console.log(response.data.message);
        }).catch(error => handleError(error))
    }
};