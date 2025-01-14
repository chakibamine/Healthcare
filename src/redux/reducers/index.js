import { combineReducers } from 'redux';
import appointmentReducer from './appointmentReducer';
import patientReducer from './patientReducer';
import doctorReducer from './doctorReducer';
import messageReducer from './messageReducer';
import roomReducer from './roomReducer';
import medicamentReducer from './medicamentReducer';
import treatmentReducer from './treatmentReducer';
import authReducer from './authReducer';
import prescriptionReducer from './prescriptionReducer';

export default combineReducers({
  appointments: appointmentReducer,
  patients: patientReducer,
  doctors: doctorReducer,
  messages: messageReducer,
  rooms: roomReducer,
  medicament: medicamentReducer,
  treatments: treatmentReducer,
  auth: authReducer,
  prescriptions: prescriptionReducer
}); 