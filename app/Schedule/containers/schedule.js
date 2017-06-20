'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientsProfessionals from '../components/smart/clientsProfessionals';
import * as scheduleActions from '../actions';

const Schedule = (props) =>{
  const { actions, auth, schedule } = props;
  return (
    <ClientsProfessionals { ...actions } auth={ auth } schedule={ schedule }/>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  schedule: state.schedule,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(scheduleActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
