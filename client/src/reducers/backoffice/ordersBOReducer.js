import * as actionType from '../../actions/backoffice/types';

const initialState = {
  orders: [],
};

const ordersBOReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ORDERS:
      return { ...state, orders: [...action.payload] };
    default:
      return { ...state };
  }
};
export default ordersBOReducer;
