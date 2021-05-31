import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import walletReducer from './walletReducer';
import authReducers from './authReducers';
import budgetReducer from './budgetReducer';
import editFormReducer from './editFormReducer';
import movementReducer from './movementReducer';
import reportReducer from './reportReducer';
import serviceReducer from './serviceReducer';
import transferReducer from './transferReducer';
import shopReducer from './shopReducer';
import invoiceReducer from './invoiceReducer';
import orderReducer from './orderReducer';

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['shopReducer'],
};

const rootReducer = combineReducers({
  authReducers,
  walletReducer,
  budgetReducer,
  editFormReducer,
  movementReducer,
  shopReducer,
  transferReducer,
  reportReducer,
  serviceReducer,
  invoiceReducer,
  orderReducer,
});

export default persistReducer(persistConfig, rootReducer);
