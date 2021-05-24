const initialState = {
  shop: [],
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SHOP':
      return { ...state, shop: state.shop.concat(action.payload) };
    case 'REMOVE_FROM_SHOP':
      return { ...state, shop: state.shop.filter((el) => el.id !== action.payload) };
    default:
      return state;
  }
};
export default shopReducer;
