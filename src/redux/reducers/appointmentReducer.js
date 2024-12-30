import { 
  FETCH_APPOINTMENTS, 
  ADD_APPOINTMENT, 
  UPDATE_APPOINTMENT, 
  DELETE_APPOINTMENT 
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
        loading: false
      };
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload]
      };
    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(appointment => 
          appointment.id === action.payload.id ? action.payload : appointment
        )
      };
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(appointment => 
          appointment.id !== action.payload
        )
      };
    default:
      return state;
  }
} 