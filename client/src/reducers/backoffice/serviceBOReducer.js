import * as actionType from '../../actions/backoffice/types';
import { orderWallet } from '../../utils/frontoffice/sortWallet';

const initialState = {
  services: [],
};

const serviceBOReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_SERVICES:
      return { ...state, services: [...action.payload].sort(orderWallet) };
    default:
      return { ...state };
  }
};
export default serviceBOReducer;
