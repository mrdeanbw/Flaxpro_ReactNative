'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ProposeTermsForm from '../components/smart/proposeTermsForm';
import * as proposeTermsActions from '../actions';
import { connect } from 'react-redux';

class ProposeTerms extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status, user } = this.props;

    return (
      <ProposeTermsForm { ...actions } status={ status } user={ user }/>
    );
  }
}

export default connect(state => ({
    status: state.hire.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(proposeTermsActions, dispatch)
  })
)(ProposeTerms);
