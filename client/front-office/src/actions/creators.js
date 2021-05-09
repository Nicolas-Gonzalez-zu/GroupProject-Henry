import axios from 'axios';
import * as actionType from './types';

const BASE_URL = 'http://localhost:3001/api/';

const serverPetition = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': 'localhost:3001',
  },
});

export const doLogin = (fields, dispatch) => {
  serverPetition
    .post('auth/login', fields)
    .then(({ data: response }) => {
      if (response.success) {
        getMe(dispatch);
      }
    })
    .catch((err) => console.log(err.message));
};

export const logout = (dispatch) => {
  serverPetition
    .get('auth/logout')
    .then(({ data: response }) => {
      dispatch({
        type: actionType.LOGOUT,
      });
      redirect(dispatch, '/login');
    })
    .catch((err) => console.log(err.message));
};

export const getMe = (dispatch) => {
  serverPetition
    .get('auth/me')
    .then(({ data }) => {
      if (!data.error) {
        dispatch({
          type: actionType.DO_LOGIN,
          payload: {
            loggedIn: true,
            loggedUser: data,
          },
        });
        redirect(dispatch, '/');
      }
    })
    .catch((err) => console.log(err.message));
};

export const doRegister = (fields, dispatch) => {
  serverPetition
    .post('auth/register', fields)
    .then(({ data: response }) => {
      if (response.success) {
        dispatch({
          type: actionType.REDIRECT,
          payload: '/login',
        });
        redirect(dispatch, '/login');
      }
    })
    .catch((err) => console.log(err.message));
};

export const redirect = (dispatch, route = false) => {
  dispatch({
    type: actionType.REDIRECT,
    payload: route,
  });
};
