'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ProfessionalInfoForm from '../components/smart/professionalInfoForm';
import * as professionalAction from '../actions';
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

const mapStateToProps = (state) => ({
  status: state.question.status,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(professionalAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalInfo);
