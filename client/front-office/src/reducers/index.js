import { combineReducers } from 'redux';
import walletReducer from './walletReducer';
import authReducers from './authReducers';
import budgetReducer from './budgetReducer';
import editFormReducer from './editFormReducer';

const rootReducer = combineReducers({
  authReducers,
  walletReducer,
  budgetReducer,
  editFormReducer,
});

export default rootReducer;
