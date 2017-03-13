'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import InboxForm from '../components/smart/inboxForm';
import * as inboxActions from '../actions';
import { connect } from 'react-redux';

class Inbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status } = this.props;
    return (
      <InboxForm { ...actions } status/>
    );
  }
}

export default connect(state => ({
    status: state.auth.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(inboxActions, dispatch)
  })
)(Inbox);
