'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ExploreForm from '../components/smart/exploreForm';
import * as exploreActions from '../actions';
import { connect } from 'react-redux';

class Explore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, auth } = this.props;
    return (
      <ExploreForm { ...actions } auth={ auth }/>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(exploreActions, dispatch),
});
export default connect(state =>
  mapStateToProps,
  mapDispatchToProps
)(Explore);
