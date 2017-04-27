import axios from 'axios';
import {Settings} from '../../settings';
import {browserHistory} from 'react-router';

const handleError = (error) => {
    if (error.response) {
        console.log(error.response.data.error);
    } else {
        console.log(error);
    }
};

export const setCurrentUser = (user) => {
    return {
        type: 'AUTH_USER',
        user
    }
};

export const logout = () => {
  return dispatch => {
      console.log('退出登录...');
      sessionStorage.removeItem('jwtToken');
      sessionStorage.removeItem('user');
      dispatch(setCurrentUser({}));
      browserHistory.push('/');
  }
};


export const login = (data) => {
    return dispatch => {
        axios.post(`${Settings.host}/auth/login`, data)
            .then(response => {
                const token = response.data.token;
                const user = response.data.user;
                sessionStorage.setItem('jwtToken', token);
                sessionStorage.setItem('user', JSON.stringify(user));
                dispatch(setCurrentUser(user));
                browserHistory.push('/');
                console.log('登录成功！');
            })
            .catch(error => {
                handleError(error);
            })
    }
};