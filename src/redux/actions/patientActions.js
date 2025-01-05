import { 
  FETCH_PATIENTS, 
  ADD_PATIENT, 
  UPDATE_PATIENT, 
  DELETE_PATIENT, 
  SET_LOADING, 
  SET_ERROR 
} from './types';

// Fetch all patients
export const fetchPatients = (patients) => ({
  type: FETCH_PATIENTS,
  payload: patients
});

// Add a new patient
export const addPatient = (patient) => ({
  type: ADD_PATIENT,
  payload: patient
});

// Update existing patient
export const updatePatient = (patient) => ({
  type: UPDATE_PATIENT,
  payload: patient
});

// Delete a patient
export const deletePatient = (patientId) => ({
  type: DELETE_PATIENT,
  payload: patientId
});

export const setLoading = (status) => ({
  type: SET_LOADING,
  payload: status
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

// Example of an async action without thunk
export const fetchPatientsAsync = () => async (dispatch) => {
  try {
    const response = await fetch('/api/patients');
    const patients = await response.json();
    dispatch(fetchPatients(patients));
  } catch (error) {
    console.error('Error fetching patients:', error);
  }
};

export const addPatientAsync = (patientData) => {
  return async dispatch => {
    try {
      // Here you would typically make an API call
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });
      const newPatient = await response.json();
      dispatch(addPatient(newPatient));
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };
}; 