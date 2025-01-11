import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_LOADING
} from '../actions/authActions';

// Get initial state from localStorage if available
const initialState = {
  isAuthenticated: false,
  token: null,
  role: null,
  userId: null,
  loading: false,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        role: action.payload.role,
        userId: action.payload.userId,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        role: null,
        userId: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...initialState
      };
    default:
      return state;
  }
} 