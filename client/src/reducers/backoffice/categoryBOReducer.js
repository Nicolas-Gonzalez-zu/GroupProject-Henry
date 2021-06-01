import * as actionType from '../../actions/backoffice/types';
import { sortID } from '../../utils/frontoffice/sortWallet';

const initialState = {
  category: [],
};

const categoryBOReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_CATEGORY:
      return { ...state, category: [...action.payload].sort(sortID) };
    default:
      return { ...state };
  }
};
export default categoryBOReducer;
