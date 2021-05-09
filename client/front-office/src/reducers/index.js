import { combineReducers } from 'redux';
import walletReducer from './walletReducer';
import authReducers from './authReducers';

const rootReducer = combineReducers({ authReducers, walletReducer  });

export default rootReducer;
