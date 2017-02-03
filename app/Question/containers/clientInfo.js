'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ClientInfoForm from '../components/smart/clientInfoForm';
import * as clientInfoActions from '../actions';
import { connect } from 'react-redux';

class ClientInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status } = this.props;
    return (
      <ClientInfoForm { ...actions } satus/>
    );
  }
}

export default connect(state => ({
    status: state.question.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(clientInfoActions, dispatch)
  })
)(ClientInfo);
