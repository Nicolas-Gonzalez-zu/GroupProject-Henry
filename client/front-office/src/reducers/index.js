import { combineReducers } from 'redux';
import walletReducer from './walletReducer';
import authReducers from './authReducers';
import budgetReducer from './budgetReducer';

const rootReducer = combineReducers({ authReducers, walletReducer, budgetReducer });

export default rootReducer;
