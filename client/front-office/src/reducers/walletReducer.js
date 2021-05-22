import * as actionType from '../actions/types';
import { orderWallet, sortWalletName, sortWalletBalance } from '../components/wallet/sortWallet';

const initialState = {
  wallets: [],
  wallet: {},
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_WALLETS:
      console.log('soy el walelt');
      return { ...state, wallets: [...action.payload].sort(orderWallet) };
    case actionType.SORT_WALLETS_AZ:
      return { ...state, wallets: state.wallets.slice().sort(sortWalletName) };
    case actionType.SORT_WALLETS_ZA:
      return { ...state, wallets: state.wallets.slice().sort(sortWalletName).reverse() };
    case actionType.SORT_WALLETS_BALANCE:
      return { ...state, wallets: state.wallets.slice().sort(sortWalletBalance).reverse() };
    case actionType.SORT_WALLETS_MIN_BALANCE:
      return { ...state, wallets: state.wallets.slice().sort(sortWalletBalance) };
    default:
      return { ...state };
  }
};
export default walletReducer;
