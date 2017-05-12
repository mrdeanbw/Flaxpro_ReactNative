'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ProfessionalProfileForm from '../components/smart/professionalProfileForm';
import * as professionalProfileActions from '../actions';
import { connect } from 'react-redux';

class ProfessionalProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status, editable, user } = this.props;
    return (
      <ProfessionalProfileForm { ...actions } status={ status } editable={ editable } user={ user }/>
    );
  }
}

export default connect(state => ({
    status: state.profile.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(professionalProfileActions, dispatch)
  })
)(ProfessionalProfile);
