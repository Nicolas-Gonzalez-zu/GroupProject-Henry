import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import walletReducer from './frontoffice/walletReducer';
import authReducers from './authReducers';
import budgetReducer from './frontoffice/budgetReducer';
import editFormReducer from './frontoffice/editFormReducer';
import movementReducer from './frontoffice/movementReducer';
import reportReducer from './frontoffice/reportReducer';
import serviceReducer from './frontoffice/serviceReducer';
import transferReducer from './frontoffice/transferReducer';
import shopReducer from './frontoffice/shopReducer';
import invoiceReducer from './frontoffice/invoiceReducer';
import orderReducer from './frontoffice/orderReducer';

import categoryBOReducer from './backoffice/categoryBOReducer';
import serviceBOReducer from './backoffice/serviceBOReducer';

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
  categoryBOReducer,
  serviceBOReducer,
});

export default persistReducer(persistConfig, rootReducer);
