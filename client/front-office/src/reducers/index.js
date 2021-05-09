import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import editFormReducer from './editFormReducer';

const rootReducer = combineReducers({ loginReducer, editFormReducer });

export default rootReducer;
