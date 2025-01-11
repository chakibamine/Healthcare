import { 
  FETCH_APPOINTMENTS, 
  ADD_APPOINTMENT, 
  UPDATE_APPOINTMENT, 
  DELETE_APPOINTMENT, 
  SET_LOADING, 
  SET_ERROR 
} from '../actions/types';

const initialState = {
  appointments: [],
  loading: false,
  error: null
};

export default function appointmentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
        loading: false,
        error: null
      };
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
        loading: false,
        error: null
      };
    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(appointment => 
          appointment.id === action.payload.id ? { ...action.payload } : appointment
        ),
        loading: false,
        error: null
      };
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(appointment => 
          appointment.id !== action.payload
        ),
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