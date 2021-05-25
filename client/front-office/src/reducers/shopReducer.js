const initialState = {
  shop: [],
};

const shopReducer = (state = initialState, action) => {
  //  console.log(action, 'priceen reducer');
  // console.log(typeof action.payload.price, 'typeof');
  switch (action.type) {
    case 'ADD_SHOP':
      //   console.log(action.payload, 'soy el supuesto item que le llega el precio como string');
      return { ...state, shop: state.shop.concat(action.payload) };
    case 'REMOVE_FROM_SHOP':
      return { ...state, shop: state.shop.filter((el) => el.id !== action.payload) };
    default:
      return state;
  }
};
export default shopReducer;
