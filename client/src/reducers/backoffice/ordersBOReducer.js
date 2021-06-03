import * as actionType from '../../actions/backoffice/types';
import { orderByPriority, orderByStartDate, orderById } from '../../utils/backoffice/sortOrders';

const initialState = {
  orders: [],
};

const ordersBOReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ORDERS:
      return { ...state, orders: [...action.payload].slice().sort(orderById) };
    case actionType.SORT_ORDERS_STATUS:
      return {
        ...state,
        orders: [...state.orders].slice().sort((a, b) => {
          if (a.status === action.payload && b.status !== action.payload) return -1;
          if (b.status === action.payload && a.status !== action.payload) return 1;
          return 0;
        }),
      };
    case actionType.SORT_ORDERS_DATE:
      return { ...state, orders: [...state.orders].slice().sort(orderByStartDate) };
    case actionType.SORT_ORDERS_DATE_REVERSE:
      return { ...state, orders: [...state.orders].slice().sort(orderByStartDate).reverse() };
    case actionType.SORT_ORDERS_PRIORITY:
      return { ...state, orders: [...state.orders].slice().sort(orderByPriority) };
    case actionType.SORT_ORDERS_PRIORITY_LOW:
      return { ...state, orders: [...state.orders].slice().sort(orderByPriority).reverse() };
    default:
      return { ...state };
  }
};
export default ordersBOReducer;
