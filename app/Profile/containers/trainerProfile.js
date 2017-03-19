'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import TrainerProfileForm from '../components/smart/trainerProfileForm';
import * as trainerProfileActions from '../actions';
import { connect } from 'react-redux';

class TrainerProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status, editable, user } = this.props;
    return (
      <TrainerProfileForm { ...actions } status={ status } editable={ editable } user={ user }/>
    );
  }
}

export default connect(state => ({
    status: state.profile.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(trainerProfileActions, dispatch)
  })
)(TrainerProfile);
