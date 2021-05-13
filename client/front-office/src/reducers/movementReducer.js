import * as actionType from '../actions/types';

const initialState = {
  movements: [],
  budget: {},
};

const movementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_MOVEMENTS:
      return { ...state, movements: [...action.payload] };
    default:
      return { ...state };
  }
};
export default movementReducer;
