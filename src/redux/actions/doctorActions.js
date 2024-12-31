import { DOCTOR_TYPES } from '../types/doctorTypes';

export const fetchDoctors = (doctors) => ({
  type: DOCTOR_TYPES.FETCH_DOCTORS,
  payload: doctors
});

export const addDoctor = (doctor) => ({
  type: DOCTOR_TYPES.ADD_DOCTOR,
  payload: { ...doctor, id: Date.now() }
});

export const updateDoctor = (doctor) => ({
  type: DOCTOR_TYPES.UPDATE_DOCTOR,
  payload: doctor
});

export const deleteDoctor = (id) => ({
  type: DOCTOR_TYPES.DELETE_DOCTOR,
  payload: id
});

export const setLoading = (status) => ({
  type: DOCTOR_TYPES.SET_LOADING,
  payload: status
});

export const setError = (error) => ({
  type: DOCTOR_TYPES.SET_ERROR,
  payload: error
}); 