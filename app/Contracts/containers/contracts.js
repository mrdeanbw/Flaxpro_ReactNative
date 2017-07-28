'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientsProfessionals from '../components/smart/contractsList';
import * as contractsActions from '../actions';
import * as inboxActions from '../../Inbox/actions';

const Schedule = (props) =>{
  const { actions, auth, contracts, startChat } = props;
  return (
    <ClientsProfessionals { ...actions } auth={ auth } contracts={ contracts } startChat={ startChat }/>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  contracts: state.contracts,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(contractsActions, dispatch),
  startChat: (userId, username) => dispatch(inboxActions.activateChatByUserId(userId, username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
