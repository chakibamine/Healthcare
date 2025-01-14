import {
  FETCH_PRESCRIPTIONS,
  ADD_PRESCRIPTION,
  UPDATE_PRESCRIPTION,
  DELETE_PRESCRIPTION,
  SET_LOADING,
  SET_ERROR
} from '../actions/types';

const initialState = {
  prescriptions: [],
  loading: false,
  error: null
};

export default function prescriptionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
        loading: false,
        error: null
      };

    case ADD_PRESCRIPTION:
      return {
        ...state,
        prescriptions: [...state.prescriptions, action.payload],
        loading: false,
        error: null
      };

    case UPDATE_PRESCRIPTION:
      return {
        ...state,
        prescriptions: state.prescriptions.map(prescription =>
          prescription.id === action.payload.id ? action.payload : prescription
        ),
        loading: false,
        error: null
      };

    case DELETE_PRESCRIPTION:
      return {
        ...state,
        prescriptions: state.prescriptions.filter(prescription => prescription.id !== action.payload),
        loading: false,
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
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
} 