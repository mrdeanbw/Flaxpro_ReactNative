'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ContractFirstForm from '../components/smart/contract/contractFirstForm';
import ContractSecondForm from '../components/smart/contract/contractSecondForm';
import * as contractActions from '../actions';
import * as profileActions from '../../Profile/actions';
import { connect } from 'react-redux';

class ProposeTerms extends Component {
  constructor(props) {
    super(props);
    props.getSessionsById(props.user, { byField: 'day' })
  }

  render() {
    const { actions, profile, user, hire } = this.props;

    return (
      hire.firstForm ?
        <ContractFirstForm { ...actions } profile={ profile } user={ user } hire={ hire }/>
        :
        <ContractSecondForm { ...actions } profile={ profile } user={ user } hire={ hire }/>
    );
  }
}

export default connect(state => ({
    hire: state.hire,
    profile: state.profile,
  }),
  (dispatch) => ({
    getSessionsById: (user, options) => dispatch(profileActions.getSessionsById({ user, options })),
    actions: bindActionCreators(contractActions, dispatch)
  })
)(ProposeTerms);
