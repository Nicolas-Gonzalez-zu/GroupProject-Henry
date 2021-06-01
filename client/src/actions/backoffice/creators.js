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

export const getServices = (dispatch) => {
  serverPetition
    .get('/bo/service')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_SERVICES,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const addService = (newService, dispatch) => {
  serverPetition
    .post('bo/service/add', newService)
    .then(({ data }) => {
      if (!data.error) {
        getServices(dispatch);
        setAlert(dispatch, 'Service added', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const changeService = (dataChange, dispatch) => {
  serverPetition
    .put('bo/service/edit', dataChange)
    .then(({ data }) => {
      if (!data.error) {
        getServices(dispatch);
        setAlert(dispatch, 'Service Changed', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const getCategory = (dispatch) => {
  serverPetition
    .get('bo/category')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_CATEGORY,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getOrders = (dispatch) => {
  serverPetition
    .get('bo/order/orderBo')
    .then(({ data }) => {
      console.log(data, 'sou la data en el back back');
      dispatch({
        type: actionType.GET_ORDERS,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
