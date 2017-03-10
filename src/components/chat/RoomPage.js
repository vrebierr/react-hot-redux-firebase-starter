import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import checkAuth from '../requireAuth';

export class RoomPage extends Component {
  constructor(props, context) {
    super(props, context);
  }
}

export default checkAuth(RoomPage);
