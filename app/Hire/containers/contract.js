'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ContractFirstForm from '../components/smart/contract/contractFirstForm';
import * as contractActions from '../actions';
import { connect } from 'react-redux';

class ProposeTerms extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status, user } = this.props;

    return (
      <ContractFirstForm { ...actions } status={ status } user={ user }/>
    );
  }
}

export default connect(state => ({
    status: state.hire.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(contractActions, dispatch)
  })
)(ProposeTerms);
