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
      dispatch({
        type: actionType.GET_ORDERS,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const addCategory = (newCategory, dispatch) => {
  serverPetition
    .post('bo/category/add', newCategory)
    .then(({ data }) => {
      if (!data.error) {
        getCategory(dispatch);
        setAlert(dispatch, 'Category added', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const changeCategory = (dataChange, dispatch) => {
  serverPetition
    .put('bo/category/edit', dataChange)
    .then(({ data }) => {
      if (!data.error) {
        getCategory(dispatch);
        setAlert(dispatch, 'Category Changed', true, 'success');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const editOrder = (newOrder, dispatch) => {
  serverPetition
    .put('bo/order/edit', newOrder)
    .then(({ data }) => {
      if (!data.error) {
        getOrders(dispatch);
        setAlert(dispatch, 'Order Edited', true, 'success');
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getEmployees = (dispatch) => {
  serverPetition
    .get('bo/employee')
    .then(({ data }) => {
      dispatch({
        type: actionType.GET_EMPLOYEES,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const ordersById = (dispatch) => {
  dispatch({ type: actionType.SORT_ORDERS_ID });
};
export const sortOrdersByStatus = (data, dispatch) => {
  dispatch({ type: actionType.SORT_ORDERS_STATUS, payload: data });
};
export const sortOrdersByPriority = (dispatch) => {
  dispatch({ type: actionType.SORT_ORDERS_PRIORITY });
};
export const sortOrdersByPriorityLow = (dispatch) => {
  dispatch({ type: actionType.SORT_ORDERS_PRIORITY_LOW });
};
export const sortOrdersByDate = (dispatch) => {
  dispatch({ type: actionType.SORT_ORDERS_DATE });
};
export const sortOrdersByDateReverse = (dispatch) => {
  console.log('hola entre auqi');
  dispatch({ type: actionType.SORT_ORDERS_DATE_REVERSE });
};
