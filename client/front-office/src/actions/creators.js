import dotenv from 'dotenv';
dotenv.config()

import axios from 'axios';

import * as actionType from './types';

const BASE_URL = 'http://localhost:3001/api/';

const serverPetition = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL || BASE_URL,
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
    .catch((e) => {
      setError(e, dispatch);
    });
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
            loggedUser: {
              ...data,
              profile: `https://d14sc2fsougwhp.cloudfront.net/${
                data.user.id
              }?ts=${Date.now().toLocaleString()}`,
            },
          },
        });
      }
    })
    .catch((err) => console.log(err.message));
};

export const getWallet = (dispatch) => {
  serverPetition
    .get('fo/wallet')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_WALLETS,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const addWallet = (newWallet, dispatch) => {
  serverPetition
    .post('fo/wallet/add', newWallet)
    .then(({ data }) => {
      if (!data.error) {
        getWallet(dispatch);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
export const changeWalletStatus = (dataChange, dispatch) => {
  serverPetition
    .put('fo/wallet/change-status', dataChange)
    .then(({ data }) => {
      console.log(data, 'soy la data del action');
      if (!data.error) {
        getWallet(dispatch);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
export const editWallet = (walletEdited, dispatch) => {
  serverPetition
    .put('fo/wallet/edit', walletEdited)
    .then(({ data }) => {
      if (!data.error) {
        getWallet(dispatch);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
//     Budgets

export const getBudget = (dispatch) => {
  serverPetition
    .get('fo/budget')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_BUDGETS,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const addBudget = (newBudget, dispatch) => {
  serverPetition
    .post('fo/budget/add', newBudget)
    .then(({ data }) => {
      if (!data.error) {
        getBudget(dispatch);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
export const changeBudgetStatus = (dataChange, dispatch) => {
  serverPetition
    .put('fo/budget/change-status', dataChange)
    .then(({ data }) => {
      console.log(data, 'soy la data del action');
      if (!data.error) {
        getBudget(dispatch);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
export const editBudget = (budgetEdited, dispatch) => {
  serverPetition
    .put('fo/budget/edit', budgetEdited)
    .then(({ data }) => {
      if (!data.error) {
        getBudget(dispatch);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const doRegister = (fields, dispatch) => {
  serverPetition
    .post('auth/register', fields)
    .then(({ data: response }) => {
      if (response.success) {
        setAlert(dispatch, 'Registration successful', true, 'success');
        redirect(dispatch, '/login');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const redirect = (dispatch, route = false) => {
  dispatch({
    type: actionType.REDIRECT,
    payload: route,
  });
};

export const initialize = (dispatch) => {
  serverPetition
    .get('auth/me')
    .then(({ data }) => {
      if (!data.error) {
        dispatch({
          type: actionType.DO_LOGIN,
          payload: {
            loggedIn: true,
            loggedUser: {
              ...data,
              profile: `https://d14sc2fsougwhp.cloudfront.net/${
                data.user.id
              }?ts=${Date.now().toLocaleString()}`,
            },
          },
        });
      }
      dispatch({
        type: actionType.INITIALIZE,
        payload: true,
      });
    })
    .catch((e) => {
      console.log(e.message);
      dispatch({
        type: actionType.INITIALIZE,
        payload: true,
      });
    });
};

export const setAlert = (dispatch, message = null, fire = false, type = null) => {
  dispatch({
    type: actionType.AUTH_ERROR,
    payload: {
      message,
      fire,
      type,
    },
  });
};

export const setError = (e, dispatch) => {
  if (e.response.data.error) {
    setAlert(dispatch, e.response.data.error, true, 'error');
  } else {
    setAlert(dispatch, e.message, true, 'error');
  }
};

export const getMovements = (dispatch) => {
  serverPetition
    .get('fo/movement')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_MOVEMENTS,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const addMovement = (newMovement, dispatch) => {
  serverPetition
    .post('fo/movement/add', newMovement)
    .then(({ data }) => {
      if (!data.error) {
        getMovements(dispatch);
        setAlert(dispatch, 'Created Movement Success', true, 'success');
      }
    })
    .catch((e) => setError(e, dispatch));
};

export const editMovement = (movementEdited, dispatch) => {
  serverPetition
    .put('fo/movement/edit', movementEdited)
    .then(({ data }) => {
      if (!data.error) {
        getMovements(dispatch);
        setAlert(dispatch, 'Edited Movement Success', true, 'success');
      }
    })
    .catch((e) => setError(e, dispatch));
};
