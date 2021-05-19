import { combineReducers } from 'redux';
import walletReducer from './walletReducer';
import authReducers from './authReducers';
import budgetReducer from './budgetReducer';
import editFormReducer from './editFormReducer';
import movementReducer from './movementReducer';
// import incomeReducer from './incomeReducer';
import reportReducer from './reportReducer';

import transferReducer from './transferReducer';

const rootReducer = combineReducers({
  authReducers,
  walletReducer,
  budgetReducer,
  editFormReducer,
  movementReducer,
  // incomeReducer,
  transferReducer,
  reportReducer,
});

export default rootReducer;
