import { 
  FETCH_ROOMS, 
  ADD_ROOM, 
  UPDATE_ROOM, 
  DELETE_ROOM 
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

export const deleteRoom = (id) => ({
  type: DELETE_ROOM,
  payload: id
}); 