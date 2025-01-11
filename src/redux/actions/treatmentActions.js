import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Action Types
export const FETCH_TREATMENTS = 'FETCH_TREATMENTS';
export const ADD_TREATMENT = 'ADD_TREATMENT';
export const UPDATE_TREATMENT = 'UPDATE_TREATMENT';
export const DELETE_TREATMENT = 'DELETE_TREATMENT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// Action Creators
export const fetchTreatments = (treatments) => ({
  type: FETCH_TREATMENTS,
  payload: treatments
});

export const addTreatment = (treatment) => ({
  type: ADD_TREATMENT,
  payload: treatment
});

export const updateTreatment = (treatment) => ({
  type: UPDATE_TREATMENT,
  payload: treatment
});

export const deleteTreatment = (id) => ({
  type: DELETE_TREATMENT,
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