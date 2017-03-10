import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkAuth from '../requireAuth';

import { sendMessage, fetchMessages, fetchRoom } from '../../actions/chatActions';
import MessageForm from './MessageForm';

export class RoomPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: {
        content: '',
        room: props.routeParams.id
      }
    };

    props.fetchRoom(props.routeParams.id);
    props.fetchMessages(props.routeParams.id);

    this.updateMessageState = this.updateMessageState.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  updateMessageState(e) {
    let message = this.state.message;
    message[e.target.name] = e.target.value;
    return this.setState({ message });
  }

  sendMessage(e) {
    e.preventDefault();

    this.setState({ savind: true });
    this.props.sendMessage(this.state.message, () => {
      this.setState({
        savind: false,
        message: {
          content: '',
          room: this.props.routeParams.id
        }
      });
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.room.name}</h1>

        <div>
          {this.props.messages.map((item) => {
            return (
              <p><strong>{item.author} :</strong> {item.content}</p>
            )
          })}
        </div>

        <MessageForm
          message={this.state.message}
          onChange={this.updateMessageState}
          onSave={this.sendMessage}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

export default checkAuth(connect(
  (state) => ({ messages: state.messages, room: state.room }),
  (dispatch) => bindActionCreators({ sendMessage, fetchMessages, fetchRoom }, dispatch)
)(RoomPage));
