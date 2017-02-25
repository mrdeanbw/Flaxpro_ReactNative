'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import AccountForm from '../components/smart/accountForm';
import * as accountActions from '../actions';
import { connect } from 'react-redux';

class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status } = this.props;
    return (
      <AccountForm { ...actions } status/>
    );
  }
}

export default connect(state => ({
    status: state.hire.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(accountActions, dispatch)
  })
)(Account);
