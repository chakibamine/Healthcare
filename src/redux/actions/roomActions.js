import { 
  FETCH_ROOMS, 
  ADD_ROOM, 
  UPDATE_ROOM, 
  DELETE_ROOM, 
  SET_LOADING, 
  SET_ERROR 
} from './types';

export const fetchRooms = (rooms) => ({
  type: FETCH_ROOMS,
  payload: rooms
});

export const addRoom = (room) => ({
  type: ADD_ROOM,
  payload: room
});

export const updateRoom = (room) => ({
  type: UPDATE_ROOM,
  payload: room
});

export const deleteRoom = (roomId) => ({
  type: DELETE_ROOM,
  payload: roomId
});

export const setLoading = (status) => ({
  type: SET_LOADING,
  payload: status
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
}); 