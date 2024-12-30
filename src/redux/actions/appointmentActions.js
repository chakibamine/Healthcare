import { 
  FETCH_APPOINTMENTS, 
  ADD_APPOINTMENT, 
  UPDATE_APPOINTMENT, 
  DELETE_APPOINTMENT 
} from './types';

export const fetchAppointments = (appointments) => ({
  type: FETCH_APPOINTMENTS,
  payload: appointments
});

export const addAppointment = (appointment) => ({
  type: ADD_APPOINTMENT,
  payload: appointment
});

export const updateAppointment = (appointment) => ({
  type: UPDATE_APPOINTMENT,
  payload: appointment
});

export const deleteAppointment = (id) => ({
  type: DELETE_APPOINTMENT,
  payload: id
}); 