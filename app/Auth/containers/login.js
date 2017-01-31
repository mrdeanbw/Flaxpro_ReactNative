'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import LoginForm from '../components/smart/loginForm';
import * as authActions from '../actions';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions } = this.props;
    return (
      <LoginForm { ...actions } />
    );
  }
}

export default connect(state => ({
    status: state.auth
  }),
  (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Login);
