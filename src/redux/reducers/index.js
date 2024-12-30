import { combineReducers } from 'redux';
import appointmentReducer from './appointmentReducer';
import patientReducer from './patientReducer';
import doctorReducer from './doctorReducer';
import messageReducer from './messageReducer';
import roomReducer from './roomReducer';

export default combineReducers({
  appointments: appointmentReducer,
  patients: patientReducer,
  doctors: doctorReducer,
  messages: messageReducer,
  rooms: roomReducer
}); 