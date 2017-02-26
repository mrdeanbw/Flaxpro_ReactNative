'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Clients_CoachesForm from '../components/smart/clients_coachesForm';
import * as clients_coachesActions from '../actions';
import { connect } from 'react-redux';

class Clients_Coaches extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status } = this.props;
    return (
      <Clients_CoachesForm { ...actions } status/>
    );
  }
}

export default connect(state => ({
    status: state.clients_coaches.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(clients_coachesActions, dispatch)
  })
)(Clients_Coaches);
