import {
  FETCH_DOCTORS,
  ADD_DOCTOR,
  UPDATE_DOCTOR,
  DELETE_DOCTOR,
  SET_LOADING,
  SET_ERROR
} from '../actions/doctorActions';

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
        loading: false,
        error: null
      };

    case ADD_DOCTOR:
      return {
        ...state,
        doctors: [...state.doctors, action.payload],
        loading: false,
        error: null
      };

    case UPDATE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.map(doctor => 
          doctor.id === action.payload.id ? action.payload : doctor
        ),
        loading: false,
        error: null
      };

    case DELETE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.filter(doctor => doctor.id !== action.payload),
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