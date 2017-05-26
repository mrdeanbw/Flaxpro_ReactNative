'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PaymentForm from '../components/smart/paymentForm';
import * as paymentActions from '../actions';
import { connect } from 'react-redux';

class Payment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status, user } = this.props;
    return (
      <PaymentForm { ...actions } status user={user}/>
    );
  }
}

export default connect(state => ({
    status: state.hire.status,
    user: state.auth.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(paymentActions, dispatch)
  })
)(Payment);
