'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import MainClientsProfessionalsForm from '../components/smart/mainClientsProfessionalsForm';
import * as clients_professionalsActions from '../actions';
import { connect } from 'react-redux';

class Clients_Professionals extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status } = this.props;
    return (
      <MainClientsProfessionalsForm { ...actions } status/>
    );
  }
}

export default connect(state => ({
    status: state.clients_professionals.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(clients_professionalsActions, dispatch)
  })
)(Clients_Professionals);