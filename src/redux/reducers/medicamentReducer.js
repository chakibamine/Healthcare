import {
  FETCH_MEDICAMENTS,
  ADD_MEDICAMENT,
  UPDATE_MEDICAMENT,
  DELETE_MEDICAMENT,
  SET_LOADING,
  SET_ERROR
} from '../actions/medicamentActions';

const initialState = {
  medicaments: [],
  loading: false,
  error: null
};

export default function medicamentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MEDICAMENTS:
      return {
        ...state,
        medicaments: action.payload,
        error: null
      };

    case ADD_MEDICAMENT:
      return {
        ...state,
        medicaments: [...state.medicaments, action.payload],
        error: null
      };

    case UPDATE_MEDICAMENT:
      return {
        ...state,
        medicaments: state.medicaments.map(med =>
          med.id === action.payload.id ? action.payload : med
        ),
        error: null
      };

    case DELETE_MEDICAMENT:
      return {
        ...state,
        medicaments: state.medicaments.filter(med => med.id !== action.payload),
        error: null
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
} 