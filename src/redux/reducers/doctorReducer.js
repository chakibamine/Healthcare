import { DOCTOR_TYPES } from '../types/doctorTypes';

const initialState = {
  doctors: [],
  loading: false,
  error: null
};

export const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCTOR_TYPES.FETCH_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
        loading: false
      };

    case DOCTOR_TYPES.ADD_DOCTOR:
      return {
        ...state,
        doctors: [...state.doctors, action.payload],
        loading: false
      };

    case DOCTOR_TYPES.UPDATE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.map(doctor => 
          doctor.id === action.payload.id ? action.payload : doctor
        ),
        loading: false
      };

    case DOCTOR_TYPES.DELETE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.filter(doctor => doctor.id !== action.payload),
        loading: false
      };

    case DOCTOR_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case DOCTOR_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}; 