import { createStore, combineReducers } from 'redux';
import { doctorReducer } from './reducers/doctorReducer';
import { roomReducer } from './reducers/roomReducer';
import { medicamentReducer } from './reducers/medicamentReducer';

const rootReducer = combineReducers({
  doctor: doctorReducer,
  room: roomReducer,
  medicament: medicamentReducer
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);