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
      .ref('/rooms/')
      .orderByKey()
      .once('value')
      .then((snap) => {
        dispatch(roomsFetchedSuccess(snap.val()));
      })
      .catch((err) => {
        ajaxCallError(err);
        throw(err);
      });
  };
}
