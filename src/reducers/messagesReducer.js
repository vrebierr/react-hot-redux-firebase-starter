import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.MESSAGES_FETCHED_SUCCESS:
      return Object.assign([], state, action.messages);
    case types.MESSAGE_CREATED_SUCCESS:
      return Object.assign([], state, action.message);
    default:
      return state;
  }
}
