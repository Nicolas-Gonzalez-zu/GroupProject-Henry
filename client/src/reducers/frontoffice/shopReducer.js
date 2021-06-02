const initialState = {
  shop: [],
  cartItemsCounter: 0,
};

const shopReducer = (state = initialState, action) => {
  //  console.log(action, 'priceen reducer');
  // console.log(typeof action.payload.price, 'typeof');
  switch (action.type) {
    case 'SET_SHOP':
      //   console.log(action.payload, 'soy el supuesto item que le llega el precio como string');
      return { ...state, shop: action.payload };
    default:
      return state;
  }
};
export default shopReducer;
