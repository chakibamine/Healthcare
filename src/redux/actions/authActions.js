import { authService } from '@/services/authService';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';

// Action Creators
export const loginRequest = () => ({
  type: 'LOGIN_REQUEST'
});

export const loginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  payload: data
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const data = await authService.login(email, password);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
}; 