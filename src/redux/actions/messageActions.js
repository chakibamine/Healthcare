import { 
  FETCH_MESSAGES, 
  ADD_MESSAGE, 
  SET_SELECTED_CONTACT 
} from './types';

export const fetchMessages = (messages) => ({
  type: FETCH_MESSAGES,
  payload: messages
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message
});

export const setSelectedContact = (contact) => ({
  type: SET_SELECTED_CONTACT,
  payload: contact
}); 