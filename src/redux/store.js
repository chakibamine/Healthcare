import { createStore, combineReducers } from 'redux';
import doctorReducer from './reducers/doctorReducer';

const rootReducer = combineReducers({
  doctors: doctorReducer,
  // other reducers...
});

const store = createStore(
  rootReducer,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;