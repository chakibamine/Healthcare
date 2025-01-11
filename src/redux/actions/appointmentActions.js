import { 
  FETCH_APPOINTMENTS, 
  ADD_APPOINTMENT, 
  UPDATE_APPOINTMENT, 
  DELETE_APPOINTMENT,
  SET_LOADING,
  SET_ERROR 
} from './types';

// Action Creators
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

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading
});

// Define and export the setError action creator
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});