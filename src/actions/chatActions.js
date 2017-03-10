import { push } from 'react-router-redux';
import firebase from 'firebase/firebase-browser';
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

export function roomFetchedSuccess(room) {
  return {
    type: types.ROOM_FETCHED_SUCCESS,
    room
  };
}

export function messageCreatedSuccess(message) {
  return {
    type: types.MESSAGE_CREATED_SUCCESS,
    message
  };
}

export function messagesFetchedSuccess(messages) {
  return {
    type: types.MESSAGES_FETCHED_SUCCESS,
    messages
  };
}

export function createRoom(room, cb) {
  return (dispatch) => {
    const ref = firebaseApi.database().ref('rooms');

    ref.push(room)
      .then(() => {
        dispatch(fetchRooms());
        cb();
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
      });
  };
}

export function sendMessage(message, cb) {
  return (dispatch) => {
    const ref = firebaseApi.database().ref('messages');
    const currentUser = firebase.auth().currentUser;

    message.author = currentUser.email;

    ref.push(message)
      .then(() => {
        dispatch(fetchMessages(message.room));
        cb();
      })
      .catch((err) => {
        ajaxCallError(err);
        throw(err);
      });
  };
}

export function fetchMessages(id) {
  return (dispatch) => {
    firebaseApi
      .database()
      .ref('messages')
      .orderByChild('room')
      .equalTo(id)
      .once('value')
      .then((snap) => {
        const messages = [];

        snap.forEach((item) => {
          let message = item.val();
          message.id = item.getKey();

          messages.push(message);
        });

        dispatch(messagesFetchedSuccess(messages));
      });
  };
}
