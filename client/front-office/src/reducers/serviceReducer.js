import * as actionType from '../actions/types';
import { orderWallet } from '../components/wallet/sortWallet';

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
