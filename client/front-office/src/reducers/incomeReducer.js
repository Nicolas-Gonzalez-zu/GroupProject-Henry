import * as actionType from '../actions/types';

const initialState = {
  incomes: [],
};

const incomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_INCOMES:
      return { ...state, incomes: [...action.payload] };
    default:
      return { ...state };
  }
};
export default incomeReducer;
