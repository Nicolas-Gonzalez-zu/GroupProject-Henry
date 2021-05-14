import * as actionType from '../actions/types';
import orderMovement from '../components/movement/MovementShort';

const initialState = {
  transfers: [],
};

const transferReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_TRANSFERS:
      return { ...state, transfers: [...action.payload].sort(orderMovement) };
    default:
      return { ...state };
  }
};
export default transferReducer;
