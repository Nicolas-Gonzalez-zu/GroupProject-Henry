import * as actionType from '../../actions/frontoffice/types';
import orderMovement from '../../components/frontoffice/movement/MovementShort';

const initialState = {
  movements: [],
  budget: {},
};

const movementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_MOVEMENTS:
      return { ...state, movements: [...action.payload].sort(orderMovement) };
    default:
      return { ...state };
  }
};
export default movementReducer;
