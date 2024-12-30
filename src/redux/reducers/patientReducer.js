import { 
  FETCH_PATIENTS, 
  ADD_PATIENT, 
  UPDATE_PATIENT, 
  DELETE_PATIENT 
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
        loading: false
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients, action.payload]
      };
    case UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map(patient => 
          patient.id === action.payload.id ? action.payload : patient
        )
      };
    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(patient => patient.id !== action.payload)
      };
    default:
      return state;
  }
} 