import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Action Types
export const FETCH_MEDICAMENTS = 'FETCH_MEDICAMENTS';
export const ADD_MEDICAMENT = 'ADD_MEDICAMENT';
export const UPDATE_MEDICAMENT = 'UPDATE_MEDICAMENT';
export const DELETE_MEDICAMENT = 'DELETE_MEDICAMENT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// Action Creators
export const fetchMedicaments = (medicaments) => ({
  type: FETCH_MEDICAMENTS,
  payload: medicaments
});

export const addMedicament = (medicament) => ({
  type: ADD_MEDICAMENT,
  payload: medicament
});

export const updateMedicament = (medicament) => ({
  type: UPDATE_MEDICAMENT,
  payload: medicament
});

export const deleteMedicament = (id) => ({
  type: DELETE_MEDICAMENT,
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