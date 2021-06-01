import * as actionType from '../../actions/frontoffice/types';
import orderMovement from '../../components/frontoffice/movement/MovementShort';

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
