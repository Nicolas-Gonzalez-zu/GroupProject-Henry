import { combineReducers } from 'redux';

import walletReducer from './walletReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({ loginReducer, walletReducer });

export default rootReducer;
