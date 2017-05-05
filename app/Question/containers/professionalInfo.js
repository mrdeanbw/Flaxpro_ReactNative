'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ProfessionalInfoForm from '../components/smart/professionalInfoForm';
import { saveProfessionalInfo } from '../actions';
import { connect } from 'react-redux';

class ProfessionalInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status } = this.props;
    return (
      <ProfessionalInfoForm { ...actions } satus/>
    );
  }
}

export default connect(state => ({
    status: state.question.status
  }),
  (dispatch) => ({
    actions: bindActionCreators(saveProfessionalInfo, dispatch)
  })
)(ProfessionalInfo);
