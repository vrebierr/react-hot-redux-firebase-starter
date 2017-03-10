import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import { createRoom, fetchRooms } from '../../actions/chatActions';
import checkAuth from '../requireAuth';

import RoomForm from './RoomForm';

export class ChatPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      room: {
        name: ''
      },
      saving: false
    };

    props.fetchRooms();

    this.updateRoomState = this.updateRoomState.bind(this);
    this.createRoom = this.createRoom.bind(this);

    console.log(this.props.rooms);
  }

  updateRoomState(e) {
    let room = this.state.room;
    room[e.target.name] = e.target.value;
    return this.setState({ room });
  }

  createRoom(e) {
    e.preventDefault();
    this.setState({ savind: true });

    this.props.createRoom(this.state.room, () => {
      this.setState({
        savind: false,
        room: {
          name: ''
        }
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Liste des Rooms</h1>

        <RoomForm
          room={this.state.room}
          onChange={this.updateRoomState}
          onSave={this.createRoom}
          saving={this.state.saving}
        />

        {this.props.rooms.map((room) => {
          return (
            <li>
              <Link to={"/rooms/" + room.id}>{room.name}</Link>
            </li>
          );
        })}
      </div>
    );
  }
}

export default checkAuth(connect(
  (state) => ({ rooms: state.rooms }),
  (dispatch) => bindActionCreators({ createRoom, fetchRooms }, dispatch)
)(ChatPage));
