import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkAuth from '../requireAuth';

import { sendMessage, fetchMessages, fetchRoom } from '../../actions/chatActions';

export class RoomPage extends Component {
  constructor(props, context) {
    super(props, context);

    props.fetchRoom(props.routeParams.id);
    props.fetchMessages(props.routeParams.id);
  }

  render() {
    return (
      <div>
        <h1>{this.props.room.name}</h1>

        <div>
          {this.props.messages.map((item) => {
            <p>{item.content}</p>
          })}
        </div>
      </div>
    );
  }
}

export default checkAuth(connect(
  (state) => ({ messages: state.messages, room: state.room }),
  (dispatch) => bindActionCreators({ sendMessage, fetchMessages, fetchRoom }, dispatch)
)(RoomPage));
