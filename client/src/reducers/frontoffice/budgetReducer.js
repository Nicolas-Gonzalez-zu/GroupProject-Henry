import * as actionType from '../../actions/frontoffice/types';
import sortBudget, { sortBudgetName, sortBudgetAmount } from '../../utils/frontoffice/sortBudget';

const initialState = {
  budgets: [],
  budget: {},
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_BUDGETS:
      return { ...state, budgets: [...action.payload].sort(sortBudget) };
    case actionType.SORT_BUDGETS_AZ:
      console.log('entre al sort az');
      return { ...state, budgets: state.budgets.slice().sort(sortBudgetName) };
    case actionType.SORT_BUDGETS_ZA:
      console.log('entre al sort budget za');
      return { ...state, budgets: state.budgets.slice().sort(sortBudgetName).reverse() };
    case actionType.SORT_BUDGETS_AMOUNT:
      console.log('entre al sort amount');
      return { ...state, budgets: state.budgets.slice().sort(sortBudgetAmount).reverse() };
    case actionType.SORT_BUDGETS_MIN_AMOUNT:
      return { ...state, budgets: state.budgets.slice().sort(sortBudgetAmount) };
    default:
      return { ...state };
  }
};
export default budgetReducer;
