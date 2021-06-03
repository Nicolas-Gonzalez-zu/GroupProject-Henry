import * as actionType from '../../actions/frontoffice/types';
import { orderByStartDate, orderById } from '../../utils/frontoffice/sortOrdersFO';

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
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
    default:
      return { ...state };
  }
};
export default orderReducer;
