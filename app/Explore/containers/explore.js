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
    const { actions } = this.props;
    return (
      <ExploreForm { ...actions } status/>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(state =>
  mapStateToProps,
  (dispatch) => ({
    actions: bindActionCreators(exploreActions, dispatch)
  })
)(Explore);
