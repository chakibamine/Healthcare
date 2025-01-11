import {
  FETCH_TREATMENTS,
  ADD_TREATMENT,
  UPDATE_TREATMENT,
  DELETE_TREATMENT,
  SET_LOADING,
  SET_ERROR
} from '../actions/treatmentActions';

const initialState = {
  treatments: [],
  loading: false,
  error: null
};

export default function treatmentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TREATMENTS:
      return {
        ...state,
        treatments: action.payload,
        error: null
      };

    case ADD_TREATMENT:
      return {
        ...state,
        treatments: [...state.treatments, action.payload],
        error: null
      };

    case UPDATE_TREATMENT:
      return {
        ...state,
        treatments: state.treatments.map(treatment =>
          treatment.id === action.payload.id ? action.payload : treatment
        ),
        error: null
      };

    case DELETE_TREATMENT:
      return {
        ...state,
        treatments: state.treatments.filter(treatment => treatment.id !== action.payload),
        error: null
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
} 