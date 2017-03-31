'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import localStorage from 'react-native-local-storage';
import { connect } from 'react-redux';

import AuthForm from '../components/smart/authForm';
import * as authActions from '../actions';

class Auth extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {auth: {user}, actions} = this.props;

    localStorage.get('authData').then((data) => {
      actions.login(data.email, null, data.token)
    })
  }

  render() {
    const { actions, auth: { status }} = this.props;
    return (
      <AuthForm { ...actions } status/>
    );
  }
}

export default connect(state => ({
    auth: state.auth
  }),
  (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Auth);
