import * as actionType from '../../actions/backoffice/types';
import sortOrders from '../../utils/frontoffice/backoffice/sortOrders';

const initialState = {
  orders: [],
};

const ordersBOReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ORDERS:
      return { ...state, orders: [...action.payload].slice().sort(sortOrders) };
    default:
      return { ...state };
  }
};
export default ordersBOReducer;
