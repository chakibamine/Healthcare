import { 
  FETCH_DOCTORS, 
  ADD_DOCTOR, 
  UPDATE_DOCTOR, 
  DELETE_DOCTOR 
} from './types';

export const fetchDoctors = (doctors) => ({
  type: FETCH_DOCTORS,
  payload: doctors
});

export const addDoctor = (doctor) => ({
  type: ADD_DOCTOR,
  payload: doctor
});

export const updateDoctor = (doctor) => ({
  type: UPDATE_DOCTOR,
  payload: doctor
});

export const deleteDoctor = (id) => ({
  type: DELETE_DOCTOR,
  payload: id
}); 