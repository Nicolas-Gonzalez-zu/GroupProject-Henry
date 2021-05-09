import * as actionType from '../actions/types';
import sortBudget from '../components/budget/sortBudget';

const initialState = {
  budgets: [],
  budget: {},
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_BUDGETS:
      return { ...state, budgets: [...action.payload].sort(sortBudget) };
    default:
      return { ...state };
  }
};
export default budgetReducer;
