import {
  FETCH_ROOMS,
  ADD_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
  SET_LOADING,
  SET_ERROR
} from '../actions/types';

const initialState = {
  rooms: [],
  loading: false,
  error: null
};

export default function roomReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        loading: false,
        error: null
      };

    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        loading: false,
        error: null
      };

    case UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map(room => 
          room.id === action.payload.id ? action.payload : room
        ),
        loading: false,
        error: null
      };

    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(room => room.id !== action.payload),
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