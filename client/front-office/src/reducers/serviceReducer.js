import * as actionType from '../actions/types';
import sortWallet from '../components/wallet/sortWallet';

const initialState = {
  services: [],
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_SERVICES:
      return { ...state, services: [...action.payload].sort(sortWallet) };
    default:
      return { ...state };
  }
};
export default serviceReducer;
