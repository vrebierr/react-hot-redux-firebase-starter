import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roomReducer(state = initialState.room, action) {
  switch (action.type) {
    case types.ROOM_FETCHED_SUCCESS:
      return Object.assign({}, state, action.room);
    default:
      return state;
  }
}
