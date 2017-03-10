import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roomsReducer(state = initialState.rooms, action) {
  switch (action.type) {
    case types.ROOMS_FETCHED_SUCCESS:
      return Object.assign([], state, action.rooms);
    case types.ROOM_CREATED_SUCCESS:
      return Object.assign([], state, action.room);
    default:
      return state;
  }
}
