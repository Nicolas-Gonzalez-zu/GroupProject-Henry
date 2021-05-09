import * as actionType from '../actions/types';
import sortWallet from '../components/wallet/sortWallet';

const initialState = {
  wallets: [],
  wallet: {},
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_WALLETS:
      return { ...state, wallets: [...action.payload].sort(sortWallet) };
    default:
      return { ...state };
  }
};
export default walletReducer;
