import { createStore, combineReducers } from 'redux';
import doctorReducer from './reducers/doctorReducer';
import roomReducer from './reducers/roomReducer';
import patientReducer from './reducers/patientReducer';

const rootReducer = combineReducers({
  doctors: doctorReducer,
  rooms: roomReducer,
  patients: patientReducer
});

const store = createStore(
  rootReducer,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;