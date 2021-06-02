import dotenv from 'dotenv';

import axios from 'axios';

import * as actionType from './types';

dotenv.config();
const BASE_URL = 'http://localhost:3001/api/';

export const serverPetition = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL || BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3001',
  },
});

export const doLogin = (fields, dispatch, isAdmin) => {
  const requestData = {
    ...fields,
    email: `${fields.email}_${isAdmin}`,
  };
  serverPetition
    .post('/auth/login', requestData)
    .then(({ data: response }) => {
      if (response.success) {
        getMe(dispatch);
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const logout = (dispatch, redirectTo) => {
  serverPetition
    .get('auth/logout')
    .then(({ data: response }) => {
      dispatch({
        type: actionType.LOGOUT,
      });
      redirect(dispatch, `/${redirectTo}/login`);
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
                data.id
              }?ts=${Date.now().toLocaleString()}`,
            },
          },
        });
      }
      const shop = JSON.parse(window.localStorage.getItem(`cart_${data.id}`)) || [];
      dispatch({ type: 'SET_SHOP', payload: shop });
    })
    .catch((err) => setError(err, dispatch));
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
      setError(e, dispatch);
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
        redirect(dispatch, '/client/login');
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
                data.id
              }?ts=${Date.now().toLocaleString()}`,
            },
          },
        });
      }
      const shop = JSON.parse(window.localStorage.getItem(`cart_${data.id}`)) || [];
      dispatch({ type: 'SET_SHOP', payload: shop });
      dispatch({
        type: actionType.INITIALIZE,
        payload: true,
      });
    })
    .catch((e) => {
      setError(e, dispatch);
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
  console.log(e);
  if (e.response) {
    setAlert(dispatch, e.response.data.error, true, 'error');
  } else {
    setAlert(dispatch, 'There was an error, try again or contact admin', true, 'error');
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
      setError(e, dispatch);
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
    .catch((err) => setError(err, dispatch));
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
      setError(e, dispatch);
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
      const date = new Date();
      const linkSource = fileURL;
      const downloadLink = document.createElement('a');
      const fileName = `Reports_${date.toString().slice(4, 24).replace(/ /g, '_')}.pdf`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      return file;
    })
    .then((fileURL) => {
      dispatch({
        type: actionType.GET_ALL_REPORTS,
        payload: fileURL,
      });
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const resetReports = (dispatch) => {
  dispatch({
    type: actionType.RESET_REPORTS,
  });
};

export const getFilteredReports = (data, dispatch) => {
  console.log('soy la data en reports action', data);
  serverPetition
    .get(`fo/reports/filter?filter=${data.filt}&value=${data.value}`, { responseType: 'blob' })
    .then((response) => {
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const date = new Date();
      const linkSource = fileURL;
      const downloadLink = document.createElement('a');
      const fileName = `Reports_${date.toString().slice(4, 24).replace(/ /g, '_')}.pdf`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      return file;
    })
    .then((fileURL) => {
      dispatch({
        type: actionType.GET_ALL_REPORTS,
        payload: fileURL,
      });
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const getServices = (dispatch) => {
  serverPetition
    .get('fo/service')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_SERVICES,
        payload: data,
      });
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const addShop = (payload, userId, dispatch) => {
  const shop = JSON.parse(window.localStorage.getItem(`cart_${userId}`)) || [];
  shop.push(payload);
  window.localStorage.setItem(`cart_${userId}`, JSON.stringify(shop));
  dispatch({ type: 'SET_SHOP', payload: shop });
  setAlert(dispatch, 'Added to the cart', true, 'success');
};
// export const deleteShop = (payload, dispatch) => {
//   dispatch({ type: 'DELETE_SHOP', payload });
// };

export const removeFromShop = (id, userId, dispatch) => {
  let shop = JSON.parse(window.localStorage.getItem(`cart_${userId}`)) || [];
  shop = shop.filter((el) => el.id !== id);
  console.log(shop);
  window.localStorage.setItem(`cart_${userId}`, JSON.stringify(shop));
  dispatch({ type: 'SET_SHOP', payload: shop });
};

export const getInvoice = (data, dispatch) => {
  serverPetition
    .get(`fo/invoice/inv?value=${data}`, { responseType: 'blob' })
    .then((response) => {
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const date = new Date();
      const linkSource = fileURL;
      const downloadLink = document.createElement('a');
      downloadLink.target = '_blank';
      const fileName = `Invoice_${date.toString().slice(4, 24).replace(/ /g, '_')}.pdf`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      return file;
    })
    .then((fileURL) => {
      dispatch({
        type: actionType.GET_INVOICE,
        payload: fileURL,
      });
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const getInvoices = (dispatch) => {
  serverPetition
    .get('fo/invoice')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_INVOICES,
        payload: data,
      });
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const sortWalletsAZ = (dispatch) => {
  dispatch({ type: actionType.SORT_WALLETS_AZ });
};

export const sortWalletZA = (dispatch) => {
  dispatch({ type: actionType.SORT_WALLETS_ZA });
};

export const sortWalletBalance = (dispatch) => {
  dispatch({ type: actionType.SORT_WALLETS_BALANCE });
};

export const sortWalletMinBalance = (dispatch) => {
  dispatch({ type: actionType.SORT_WALLETS_MIN_BALANCE });
};

// export const paymentMP = (item) => {
//   serverPetition
//     .post('fo/mp', item)
//     .then((order) => {
//       console.log(order, 'soy el order');
//       return order;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const getInvoiceById = (id, dispatch) => {
  console.log(id, 'soy el id en la acc');
  serverPetition
    .get(`fo/invoice/${id}`)
    .then(({ data }) => {
      console.log(data, 'soy la data en action');
      dispatch({
        type: actionType.GET_INVOICE_ID,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sortBudgetAz = (dispatch) => {
  dispatch({ type: actionType.SORT_BUDGETS_AZ });
};
export const sortBudgetZa = (dispatch) => {
  dispatch({ type: actionType.SORT_BUDGETS_ZA });
};
export const sortBudgetAmount = (dispatch) => {
  dispatch({ type: actionType.SORT_BUDGETS_AMOUNT });
};
export const sortBudgetMinAmount = (dispatch) => {
  dispatch({ type: actionType.SORT_BUDGETS_MIN_AMOUNT });
};

export const getOrders = (dispatch) => {
  serverPetition
    .get('fo/order')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_ORDERS,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
