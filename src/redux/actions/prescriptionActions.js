import { 
  FETCH_PRESCRIPTIONS,
  ADD_PRESCRIPTION,
  UPDATE_PRESCRIPTION,
  DELETE_PRESCRIPTION,
  SET_LOADING,
  SET_ERROR
} from './types';

export const fetchPrescriptions = (prescriptions) => ({
  type: FETCH_PRESCRIPTIONS,
  payload: prescriptions
});

export const addPrescription = (prescription) => ({
  type: ADD_PRESCRIPTION,
  payload: prescription
});

export const updatePrescription = (prescription) => ({
  type: UPDATE_PRESCRIPTION,
  payload: prescription
});

export const deletePrescription = (id) => ({
  type: DELETE_PRESCRIPTION,
  payload: id
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
}); 