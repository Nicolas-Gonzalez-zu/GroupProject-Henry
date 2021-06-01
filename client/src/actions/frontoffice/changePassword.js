import dotenv from 'dotenv';
import axios from 'axios';
import * as actionType from './types';
import { getMe, setAlert } from './creators';

dotenv.config();
const BASE_URL = 'http://localhost:3001/api/';

const serverPetition = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL || BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': process.env.REACT_APP_BACKEND_URL || 'localhost:3001',
  },
});

export function resetPassword(passwords) {
  return (dispatch) => {
    serverPetition
      .post(`/auth/resetPassword/${passwords.id}/${passwords.token}`, passwords, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        if (data.success) {
          getMe(dispatch);
          setAlert(dispatch, 'We change your password', true, 'success');
        }
      })
      .catch((err) => console.log(err.message));
    dispatch({ type: actionType.FORGOT_USER_PASSWORD });
  };
}

export function forgotPassword(email) {
  // eslint-disable-next-line func-names

  return (dispatch) => {
    serverPetition
      .post('/auth/forgotPassword', email, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        if (data.message === 'request recived') {
          console.log('aca');
          getMe(dispatch);
          setAlert(dispatch, 'Request sended', true, 'success');
        }
      })
      .catch((err) => console.log(err.message));
    dispatch({ type: actionType.FORGOT_USER_PASSWORD });
  };
}

export default function changePassword(editPassword) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    if (editPassword.newPassword === editPassword.newPassword2) {
      serverPetition
        .put('/fo/editUserInfo/changePassword', editPassword, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(({ data }) => {
          if (data.success) {
            getMe(dispatch);
            setAlert(dispatch, 'change success', true, 'success');
          }
        })
        .catch((err) => console.log(err.message));
      dispatch({ type: actionType.EDIT_USER_PASSWORD });
    }
  };
}
