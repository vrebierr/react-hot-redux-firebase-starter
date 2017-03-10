import { push } from 'react-router-redux';
import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import toastr from 'toastr';
import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';

export function roomCreatedSuccess(room) {
  return {
    type: types.ROOM_CREATED_SUCCESS,
    room
  };
}

export function roomsFetchedSuccess(rooms) {
  return {
    type: types.ROOMS_FETCHED_SUCCESS,
    rooms
  };
}

export function roomFetchedSuccess(rooms) {
  return {
    type: types.ROOM_FETCHED_SUCCESS,
    rooms
  };
}

export function createRoom(room) {
  return (dispatch) => {
    const ref = firebaseApi.database().ref('rooms');

    ref.push(room)
      .then(() => {
        ref.orderByKey().on('child_added', function(snap) {
          dispatch(roomCreatedSuccess(snap.val()));
          dispatch(push(`/rooms/${snap.getKey()}`));
        });
      })
      .catch((err) => {
        ajaxCallError(err);
        throw(err);
      });
  };
}

export function fetchRooms() {
  return (dispatch) => {
    firebaseApi
      .database()
      .ref('rooms')
      .orderByKey()
      .once('value')
      .then((snap) => {
        const rooms = [];

        snap.forEach((item) => {
          let room = item.val();
          room.id = item.getKey();

          rooms.push(room);
        });

        dispatch(roomsFetchedSuccess(rooms));
      })
      .catch((err) => {
        ajaxCallError(err);
        throw(err);
      });
  };
}

export function fetchRoom(id) {
  return (dispatch) => {
    firebaseApi
      .database()
      .ref(`rooms/${id}`)
      .once('value')
      .then((snap) => {
        dispatch(roomFetchedSuccess(snap.val()));
      })
      .catch((err) => {
        ajaxCallError(err);
        throw(err);
      });
  };
}

export function sendMessage(room) {
  return (dispatch) => {

  };
}

export function fetchMessages(room) {
  return (dispatch) => {
    firebaseApi
      .database()
      .ref(`/rooms/${room.id}/messages`)
      .limitToLast(10)
      .once('value')
      .then((snap) => {
        const messages = [];

        snap.forEach((item) => {
          let message = item.val();
          message.id = item.getKey();

          messages.push(message);
        });
      });
  };
}
