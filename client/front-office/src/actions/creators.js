import axios from 'axios';
import * as actionType from './types';

const BASE_URL = 'http://localhost:3001/api/';

const serverPetition = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
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
    })
    .catch((err) => console.log(err.message));
};

export const getMe = (dispatch) => {
  serverPetition.get('auth/me').then(({ data }) => {
    if (!data.error) {
      dispatch({
        type: actionType.DO_LOGIN,
        payload: {
          loggedIn: true,
          loggedUser: data,
        },
      });
    }
  });
};

// alimentacion = 7000  500
//
// todos los mov que correspondan a ese budget = suma de mov > 7000 genera alerta
//
// mov por 500
