import { 
  FETCH_ROOMS, 
  ADD_ROOM, 
  UPDATE_ROOM, 
  DELETE_ROOM 
} from '../actions/types';

const initialState = {
  rooms: [],
  loading: false,
  error: null
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROOMS':
      return {
        ...state,
        rooms: action.payload,
        loading: false
      };

    case 'ADD_ROOM':
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        loading: false
      };

    case 'UPDATE_ROOM':
      return {
        ...state,
        rooms: state.rooms.map(room => 
          room.id === action.payload.id ? action.payload : room
        ),
        loading: false
      };

    case 'DELETE_ROOM':
      return {
        ...state,
        rooms: state.rooms.filter(room => room.id !== action.payload),
        loading: false
      };

    default:
      return state;
  }
}; 