import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from '../reducers';

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export default { store, persistor };
