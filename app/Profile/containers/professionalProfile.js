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
  componentWillMount() {
    this.props.actions.getFullProfile();
  }

  render() {
    const { actions, editable } = this.props;
    return (
      <ProfessionalProfileForm { ...actions } editable={ editable }/>
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
