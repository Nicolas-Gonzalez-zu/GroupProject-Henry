import * as actionType from '../actions/types';
// import sortWallet from '../components/wallet/sortWallet';

const initialState = {
  shop: [],
};

const shopReducer = (state = initialState, action) => {
  console.log('entre al reducer del shop');
  console.log(action.type, 'soy el action type');
  switch (action.type) {
    case 'ADD_SHOP':
      console.log('hola');
      return { ...state, shop: state.shop.concat(action.payload) };
    case 'REMOVE_FROM_SHOP':
      return { ...state, shop: state.shop.filter((el) => el.id !== action.payload) };
    default:
      return state;
  }
};
export default shopReducer;
