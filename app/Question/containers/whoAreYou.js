'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import WhoAreYouForm from '../components/smart/whoAreYouForm';
import * as whoAreYouActions from '../actions';
import { connect } from 'react-redux';

class WhoAreYou extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status } = this.props;
    return (
      <WhoAreYouForm { ...actions } status/>
    );
  }
}

export default connect(state => ({
    status: state.question.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(whoAreYouActions, dispatch)
  })
)(WhoAreYou);
