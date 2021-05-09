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

export const getWallet = (dispatch) => {
  serverPetition.get('fo/wallet').then(({ data }) => {
    dispatch({
      type: actionType.GET_WALLETS,
      payload: data,
    });
  });
};
export const addWallet = (newWallet, dispatch) => {
  serverPetition.post('fo/wallet/add', newWallet).then(({ data }) => {
    if (!data.error) {
      getWallet(dispatch);
    }
  });
};
export const changeWalletStatus = (dataChange, dispatch) => {
  serverPetition.put('fo/wallet/change-status', dataChange).then(({ data }) => {
    console.log(data, 'soy la data del action');
    if (!data.error) {
      getWallet(dispatch);
    }
  });
};
export const editWallet = (walletEdited, dispatch) => {
  serverPetition.put('fo/wallet/edit', walletEdited).then(({ data }) => {
    if (!data.error) {
      getWallet(dispatch);
    }
  });
};

// alimentacion = 7000  500
//
// todos los mov que correspondan a ese budget = suma de mov > 7000 genera alerta
//
// mov por 500
