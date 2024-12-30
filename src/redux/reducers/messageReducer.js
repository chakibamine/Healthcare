import { 
  FETCH_MESSAGES, 
  ADD_MESSAGE, 
  SET_SELECTED_CONTACT 
} from '../actions/types';

const initialState = {
  messages: [],
  contacts: [],
  selectedContact: null,
  loading: false,
  error: null
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case SET_SELECTED_CONTACT:
      return {
        ...state,
        selectedContact: action.payload
      };
    default:
      return state;
  }
} 