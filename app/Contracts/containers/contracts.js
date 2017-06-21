'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientsProfessionals from '../components/smart/contractsList';
import * as contractsActions from '../actions';

const Schedule = (props) =>{
  const { actions, auth, contracts } = props;
  return (
    <ClientsProfessionals { ...actions } auth={ auth } contracts={ contracts }/>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  contracts: state.contracts,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(contractsActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
