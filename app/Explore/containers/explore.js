'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProfessionalExploreForm from '../components/smart/exploreForm/professionalExploreForm';
import ClientExploreForm from '../components/smart/exploreForm/clientExploreForm';
import * as exploreActions from '../actions';
import * as authActions from '../../Auth/actions';
import * as CommonConstant from '../../Components/commonConstant';

const Explore = (props) => {
  const { actions, auth, explore, getCurrentAddress } = props;
  return (
    auth.user.role === CommonConstant.user_client ?
      <ClientExploreForm { ...actions } auth={ auth } explore={ explore } getCurrentAddress={ getCurrentAddress } />
      :
      <ProfessionalExploreForm { ...actions } auth={ auth } explore={ explore } getCurrentAddress={ getCurrentAddress } />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  explore: state.explore,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(exploreActions, dispatch),
  getCurrentAddress: (data) => dispatch(authActions.getCurrentAddress(data)),
});

export default connect(state =>
  mapStateToProps,
  mapDispatchToProps
)(Explore);
