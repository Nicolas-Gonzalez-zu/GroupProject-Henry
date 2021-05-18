import dotenv from 'dotenv';

import axios from 'axios';
import { getIn } from 'formik';

import * as actionType from './types';

dotenv.config();
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
        setAlert(dispatch, 'Wallet added', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};
export const changeWalletStatus = (dataChange, dispatch) => {
  serverPetition
    .put('fo/wallet/change-status', dataChange)
    .then(({ data }) => {
      console.log(data, 'soy la data del action');
      if (!data.error) {
        getWallet(dispatch);
        setAlert(dispatch, 'Wallet status changed', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};
export const editWallet = (walletEdited, dispatch) => {
  serverPetition
    .put('fo/wallet/edit', walletEdited)
    .then(({ data }) => {
      if (!data.error) {
        getWallet(dispatch);
        setAlert(dispatch, 'Wallet edited', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
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
        setAlert(dispatch, 'Budget added', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};
export const changeBudgetStatus = (dataChange, dispatch) => {
  serverPetition
    .put('fo/budget/change-status', dataChange)
    .then(({ data }) => {
      console.log(data, 'soy la data del action');
      if (!data.error) {
        getBudget(dispatch);
        setAlert(dispatch, 'Budget status changed', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};
export const editBudget = (budgetEdited, dispatch) => {
  serverPetition
    .put('fo/budget/edit', budgetEdited)
    .then(({ data }) => {
      if (!data.error) {
        getBudget(dispatch);
        setAlert(dispatch, 'Budget edited', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
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
    console.log(e.response);
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
export const getIncomes = (dispatch) => {
  serverPetition
    .get('fo/movement')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_INCOMES,
        payload: data,
      });
    })
    .catch((err) => console.log(err));
};
export const addIncome = (income, dispatch) => {
  serverPetition
    .post('fo/movement/add', income)
    .then(({ data }) => {
      if (!data.error) {
        console.log(income);
        getMovements(dispatch);
        setAlert(dispatch, 'Income added', true, 'success');
      }
    })
    .catch((err) => setError(err, dispatch));
};
export const editIncome = (incomeEdited, dispatch) => {
  serverPetition
    .put('fo/movement/edit', incomeEdited)
    .then(({ data }) => {
      if (!data.error) {
        getIncomes(dispatch);
        setAlert(dispatch, 'Income edited', true, 'success');
      }
    })
    .catch((err) => setError(dispatch, err));
};

export const getTransfer = (dispatch) => {
  serverPetition
    .get('fo/transfer')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_TRANSFERS,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const addTransfer = (newTransfer, dispatch) => {
  serverPetition
    .post('fo/transfer/add', newTransfer)
    .then(({ data }) => {
      if (!data.error) {
        getTransfer(dispatch);
        setAlert(dispatch, 'Created Transfer Success', true, 'success');
      }
    })
    .catch((e) => setError(e, dispatch));
};

export const getAllReports = (dispatch) => {
  serverPetition
    .get('fo/reports', { responseType: 'blob' })
    .then((response) => {
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
    .catch((e) => {
      console.log(e);
    });
};
