import axios from 'axios';
import * as actionType from './types';

const BASE_URL = 'http://localhost:3001/api/';

const serverPetition = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export function fileExtension(fileType) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    const extension = fileType.slice(6);
    dispatch({ type: actionType.FILE_EXTENSION, payload: extension });
  };
}

export function editUser(fileType) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    console.log(fileType);
    serverPetition
      .post('/fo/upload', fileType, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err.message));
    dispatch({ type: actionType.EDIT_USER_INFO, payload: fileType });
  };
}
