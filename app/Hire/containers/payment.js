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
    const { actions, status } = this.props;
    return (
      <PaymentForm { ...actions } status/>
    );
  }
}

export default connect(state => ({
    status: state.hire.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(paymentActions, dispatch)
  })
)(Payment);
