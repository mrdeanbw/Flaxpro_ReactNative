'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ClientInfoForm from '../components/smart/clientInfoForm';
import * as clientAction from '../actions';
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

const mapStateToProps = (state) => ({
  status: state.question.status,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(clientAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientInfo);
