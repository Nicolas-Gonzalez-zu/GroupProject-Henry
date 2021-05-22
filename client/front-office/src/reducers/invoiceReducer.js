import * as actionType from '../actions/types';

const initialState = {
  invoice: '',
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_INVOICE:
      return { reports: action.payload };
    default:
      return { ...state };
  }
};
export default invoiceReducer;
