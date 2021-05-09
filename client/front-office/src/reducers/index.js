import { combineReducers } from 'redux';
import walletReducer from './walletReducer';
import authReducers from './authReducers';
import editFormReducer from './editFormReducer';


const rootReducer = combineReducers({ authReducers, walletReducer, editFormReducer  });


export default rootReducer;
