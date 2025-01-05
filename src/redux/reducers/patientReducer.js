import { 
  FETCH_PATIENTS, 
  ADD_PATIENT, 
  UPDATE_PATIENT, 
  DELETE_PATIENT, 
  SET_LOADING, 
  SET_ERROR 
} from '../actions/types';

const initialState = {
  patients: [],
  loading: false,
  error: null
};

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PATIENTS:
      return {
        ...state,
        patients: action.payload,
        loading: false,
        error: null
      };

    case ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients, action.payload],
        loading: false,
        error: null
      };

    case UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map(patient => 
          patient.id === action.payload.id ? { ...action.payload } : patient
        ),
        loading: false,
        error: null
      };

    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(patient => patient.id !== action.payload),
        loading: false,
        error: null
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null
      };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
} 