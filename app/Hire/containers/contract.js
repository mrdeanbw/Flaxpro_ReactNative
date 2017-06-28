'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import ContractFirstForm from '../components/smart/contract/contractFirstForm';
import ContractSecondForm from '../components/smart/contract/contractSecondForm';
import ContractSummaryForm from '../components/smart/contract/contractSummaryForm';
import PaymentForm from '../components/smart/paymentForm';
import * as contractActions from '../actions';
import * as profileActions from '../../Profile/actions.js';
import { connect } from 'react-redux';

class ProposeTerms extends Component {
  static propTypes = {
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: false,
  };

  constructor(props) {
    super(props);
    props.getScheduleById(props.user, { byField: 'day' })
  }

  render() {
    const { auth, actions, user, hire, profile,  editable } = this.props;
    switch(true) {
      case hire.firstForm: return <ContractFirstForm { ...actions } user={ user } hire={ hire } auth={auth} editable={ editable }/>;
      case hire.secondForm: return <ContractSecondForm { ...actions } user={ user } hire={ hire } auth={auth}/>;
      case hire.paymentForm: return <PaymentForm { ...actions } user={user} hire={ hire } editable={false}/>;
      case hire.summaryForm: return <ContractSummaryForm { ...actions } user={ user }  profile={ profile } hire={ hire } auth={auth}/>;
    }
  }
}

export default connect(state => ({
    hire: state.hire,
    auth: state.auth,
    profile: state.profile,
  }),
  (dispatch) => ({
    getScheduleById: (user, options) => dispatch(contractActions.getScheduleById({ user, options })),
    actions: bindActionCreators({...contractActions, ...profileActions}, dispatch),
  })
)(ProposeTerms);
