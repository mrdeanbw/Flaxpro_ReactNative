'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import PaymentForm from '../components/smart/paymentForm';
import AddCardForm from '../components/smart/addCardForm';
import * as paymentActions from '../actions';
import { connect } from 'react-redux';


class Payment extends Component {
  static propTypes = {
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status, user, hire, onBack, onSelected } = this.props;
    
    switch(true) {
      case hire.addCardForm: 
        return <AddCardForm
            { ...actions }
            user={ user }
            hire={ hire }
          />;
      default: 
        return <PaymentForm 
          { ...actions } 
          status 
          user={user} 
          hire={ hire }
          onBack={ onBack }
          onSelected={ onSelected }
          editable={this.props.editable}
        />
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
