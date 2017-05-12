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
    const {auth: {user}, login} = this.props;
    localStorage.get('authData').then((data) => {
      login(data.email, null, data.token)
    })
  }

  render() {
    const { actions } = this.props;
    return (
      <AuthForm { ...actions } />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password, token) => dispatch(authActions.login(email, password, token)),
  actions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
