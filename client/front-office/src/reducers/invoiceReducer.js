import orderMovement from '../components/movement/MovementShort';
import * as actionType from '../actions/types';

const initialState = {
  invoice: '',
  invoices: [],
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_INVOICE:
      return { reports: action.payload };
    case actionType.GET_INVOICES:
      return { ...state, invoices: [...action.payload].sort(orderMovement) };
    default:
      return { ...state };
  }
};
export default invoiceReducer;
