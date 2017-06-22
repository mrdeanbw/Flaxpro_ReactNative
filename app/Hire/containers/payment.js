'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PaymentForm from '../components/smart/paymentForm';
import AddCardForm from '../components/smart/addCardForm';
import * as paymentActions from '../actions';
import { connect } from 'react-redux';


class Payment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('this.props', this.props);
    const { actions, status, user, hire } = this.props;

    switch(true) {
      case hire.addCardForm: return <AddCardForm { ...actions } user={ user } hire={ hire }/>;
      default: return <PaymentForm { ...actions } status user={user}/>
    }
  }
}

export default connect(state => ({
    status: state.hire.status,
    user: state.auth.user,
    hire: state.hire
  }),
  (dispatch) => ({
    actions: bindActionCreators(paymentActions, dispatch)
  })
)(Payment);
