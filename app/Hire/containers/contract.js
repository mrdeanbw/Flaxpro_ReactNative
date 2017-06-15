'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ContractFirstForm from '../components/smart/contract/contractFirstForm';
import ContractSecondForm from '../components/smart/contract/contractSecondForm';
import * as contractActions from '../actions';
import { connect } from 'react-redux';

class ProposeTerms extends Component {
  constructor(props) {
    super(props);
    props.getScheduleById(props.user, { byField: 'day' })
  }

  render() {
    const { actions, user, hire } = this.props;

    return (
      hire.firstForm ?
        <ContractFirstForm { ...actions } user={ user } hire={ hire }/>
        :
        <ContractSecondForm { ...actions } user={ user } hire={ hire }/>
    );
  }
}

export default connect(state => ({
    hire: state.hire,
  }),
  (dispatch) => ({
    getScheduleById: (user, options) => dispatch(contractActions.getScheduleById({ user, options })),
    actions: bindActionCreators(contractActions, dispatch)
  })
)(ProposeTerms);
