import { 
  FETCH_DOCTORS, 
  ADD_DOCTOR, 
  UPDATE_DOCTOR, 
  DELETE_DOCTOR 
} from '../actions/types';

const initialState = {
  doctors: [],
  loading: false,
  error: null
};

export default function doctorReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
        loading: false
      };
    case ADD_DOCTOR:
      return {
        ...state,
        doctors: [...state.doctors, action.payload]
      };
    case UPDATE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.map(doctor => 
          doctor.id === action.payload.id ? action.payload : doctor
        )
      };
    case DELETE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.filter(doctor => doctor.id !== action.payload)
      };
    default:
      return state;
  }
} 