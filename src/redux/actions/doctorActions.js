// Action Types
export const FETCH_DOCTORS = 'FETCH_DOCTORS';
export const ADD_DOCTOR = 'ADD_DOCTOR';
export const UPDATE_DOCTOR = 'UPDATE_DOCTOR';
export const DELETE_DOCTOR = 'DELETE_DOCTOR';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// Action Creators
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

export const deleteDoctor = (doctorId) => ({
  type: DELETE_DOCTOR,
  payload: doctorId
});

export const setLoading = (status) => ({
  type: SET_LOADING,
  payload: status
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
}); 