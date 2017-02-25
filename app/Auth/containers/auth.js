'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import AuthForm from '../components/smart/authForm';
import * as authActions from '../actions';
import { connect } from 'react-redux';

class Auth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status } = this.props;
    return (
      <AuthForm { ...actions } status/>
    );
  }
}

export default connect(state => ({
    status: state.auth.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Auth);
