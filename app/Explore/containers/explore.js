'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ExploreForm from '../components/smart/exploreForm';
import * as exploreActions from '../actions';

const Explore = (props) => {
  const { actions, auth, explore } = props;
  return (
    <ExploreForm { ...actions } auth={ auth } explore={ explore }/>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  explore: state.explore,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(exploreActions, dispatch),
});

export default connect(state =>
  mapStateToProps,
  mapDispatchToProps
)(Explore);
