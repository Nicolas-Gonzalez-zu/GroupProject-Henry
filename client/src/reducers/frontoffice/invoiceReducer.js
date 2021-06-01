import orderMovement from '../../components/frontoffice/movement/MovementShort';
import * as actionType from '../../actions/frontoffice/types';

const initialState = {
  invoice: '',
  invoices: [],
  invoiceId: {},
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_INVOICE:
      return { ...state, reports: action.payload };
    case actionType.GET_INVOICES:
      return { ...state, invoices: [...action.payload].sort(orderMovement) };
    case actionType.GET_INVOICE_ID:
      console.log(action.payload, 'soy el action.payload');
      return { ...state, invoiceId: { ...action.payload } };
    default:
      return { ...state };
  }
};
export default invoiceReducer;
