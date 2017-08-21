'use strict';
import { View } from 'react-native';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ProfessionalInfoForm from '../components/smart/professionalInfoForm';
import ProfessionalInfoSecondForm from '../components/smart/professionalInfoSecondForm';
import * as professionalAction from '../actions';
import { connect } from 'react-redux';

class ProfessionalInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, status, firstForm } = this.props;
    return (
    <View style={{flex: 1, position: 'relative'}}>
      {
        firstForm &&
        <ProfessionalInfoForm { ...actions } status/>
      }
      {
        !firstForm &&
        <ProfessionalInfoSecondForm { ...actions } status/>
      }

    </View>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.question.status,
  firstForm: state.question.firstForm,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(professionalAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalInfo);
