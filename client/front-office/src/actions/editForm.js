import dotenv from 'dotenv';
dotenv.config()

import axios from 'axios';
import * as actionType from './types';
import { getMe, redirect } from './creators';

const BASE_URL = 'http://localhost:3001/api/';

const serverPetition = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL || BASE_URL,
});

export function fileExtension(fileType) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    const extension = fileType.slice(6);
    dispatch({ type: actionType.FILE_EXTENSION, payload: extension });
  };
}

export function editUser(fileType, userInfo) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    if (userInfo) {
      serverPetition
        .put('/fo/editUserInfo', userInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(({ data }) => {
          if (data.success) {
            getMe(dispatch);
            redirect(dispatch, '/profile');
          }
        })
        .catch((err) => console.log(err.message));
    }

    if (fileType) {
      serverPetition
        .post('/fo/upload', fileType, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => {
          if (data.success) {
            getMe(dispatch);
            redirect(dispatch, '/profile');
            console.log('hola');
          }
        })
        .catch((err) => console.log(err.message));
    }

    dispatch({ type: actionType.EDIT_USER_INFO, payload: fileType });
  };
}
