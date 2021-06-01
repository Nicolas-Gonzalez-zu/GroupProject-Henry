import * as actionType from '../../actions/frontoffice/types';
import { orderWallet } from '../../utils/frontoffice/sortWallet';

const initialState = {
  services: [],
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_SERVICES:
      return { ...state, services: [...action.payload].sort(orderWallet) };
    default:
      return { ...state };
  }
};
export default serviceReducer;
